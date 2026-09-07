// src/lib/workflows/runtime.ts
// Workflow runtime actions backed by the workflow tables, plus the
// Nucleus execution bridge (exported as startNucleusWorkflow).

import { supabase } from "@/integrations/supabase/client";
import { NucleusWorkflowAdapter } from "../../nucleus/workflows/nucleusWorkflowAdapter";
import type { WorkflowRunRow, WorkflowStepRow, WorkflowVersionRow, WorkflowRow } from "./queries";

type Json = Record<string, unknown>;

async function currentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error("Not authenticated");
  return data.user.id;
}

async function audit(args: {
  organization_id: string;
  workflow_id?: string | null;
  run_id?: string | null;
  event_type: string;
  payload?: Json;
}) {
  const actor_id = await currentUserId().catch(() => null);
  await supabase.from("workflow_audit_events").insert({
    organization_id: args.organization_id,
    workflow_id: args.workflow_id ?? null,
    run_id: args.run_id ?? null,
    event_type: args.event_type,
    actor_id,
    payload: args.payload ?? {},
  });
}

export async function createWorkflow(args: {
  organization_id: string;
  name: string;
  description?: string | null;
}): Promise<WorkflowRow> {
  const created_by = await currentUserId();
  const { data, error } = await supabase
    .from("workflows")
    .insert({
      organization_id: args.organization_id,
      name: args.name,
      description: args.description ?? null,
      created_by,
    })
    .select("*")
    .single();
  if (error) throw error;
  await audit({
    organization_id: args.organization_id,
    workflow_id: data.id,
    event_type: "workflow.created",
    payload: { name: args.name },
  });
  return data as WorkflowRow;
}

export async function archiveWorkflow(args: {
  workflow_id: string;
  organization_id: string;
}): Promise<void> {
  const { error } = await supabase
    .from("workflows")
    .update({ status: "archived" })
    .eq("id", args.workflow_id);
  if (error) throw error;
  await audit({
    organization_id: args.organization_id,
    workflow_id: args.workflow_id,
    event_type: "workflow.archived",
  });
}

export async function createDraftVersion(args: {
  workflow_id: string;
  organization_id: string;
  definition: unknown;
}): Promise<WorkflowVersionRow> {
  const created_by = await currentUserId();
  const { data: latest, error: latestError } = await supabase
    .from("workflow_versions")
    .select("version_number")
    .eq("workflow_id", args.workflow_id)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (latestError) throw latestError;

  const version_number = (latest?.version_number ?? 0) + 1;
  const { data, error } = await supabase
    .from("workflow_versions")
    .insert({
      workflow_id: args.workflow_id,
      version_number,
      definition_json: args.definition as Json,
      created_by,
    })
    .select("*")
    .single();
  if (error) throw error;
  await audit({
    organization_id: args.organization_id,
    workflow_id: args.workflow_id,
    event_type: "workflow.version.drafted",
    payload: { version_number },
  });
  return data as WorkflowVersionRow;
}

export async function publishVersion(args: {
  version_id: string;
  workflow_id: string;
  organization_id: string;
}): Promise<void> {
  const { error } = await supabase
    .from("workflow_versions")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", args.version_id);
  if (error) throw error;

  const { error: wfError } = await supabase
    .from("workflows")
    .update({ status: "active" })
    .eq("id", args.workflow_id);
  if (wfError) throw wfError;

  await audit({
    organization_id: args.organization_id,
    workflow_id: args.workflow_id,
    event_type: "workflow.version.published",
    payload: { version_id: args.version_id },
  });
}

export async function startWorkflow(args: {
  organization_id: string;
  workflow_id: string;
  version_id: string;
  input?: unknown;
}): Promise<WorkflowRunRow> {
  const created_by = await currentUserId();
  const { data, error } = await supabase
    .from("workflow_runs")
    .insert({
      organization_id: args.organization_id,
      workflow_id: args.workflow_id,
      version_id: args.version_id,
      status: "running",
      started_at: new Date().toISOString(),
      input_json: (args.input ?? {}) as Json,
      created_by,
    })
    .select("*")
    .single();
  if (error) throw error;
  await audit({
    organization_id: args.organization_id,
    workflow_id: args.workflow_id,
    run_id: data.id,
    event_type: "workflow.run.started",
  });
  return data as WorkflowRunRow;
}

async function finishRun(
  organization_id: string,
  run_id: string,
  status: "completed" | "failed" | "cancelled",
  patch: Json = {},
): Promise<void> {
  const { error } = await supabase
    .from("workflow_runs")
    .update({ status, completed_at: new Date().toISOString(), ...patch })
    .eq("id", run_id);
  if (error) throw error;
  await audit({
    organization_id,
    run_id,
    event_type: `workflow.run.${status}`,
    payload: patch,
  });
}

export async function completeWorkflow(
  organizationId: string,
  runId: string,
  output?: unknown,
): Promise<void> {
  await finishRun(organizationId, runId, "completed", {
    output_json: (output ?? {}) as Json,
  });
}

export async function failWorkflow(
  organizationId: string,
  runId: string,
  error?: unknown,
): Promise<void> {
  await finishRun(organizationId, runId, "failed", {
    error_json: (error ?? {}) as Json,
  });
}

export async function cancelWorkflow(
  organizationId: string,
  runId: string,
  reason?: string,
): Promise<void> {
  await finishRun(organizationId, runId, "cancelled", {
    error_json: { reason: reason ?? "Cancelled" },
  });
}

export async function startStep(args: {
  run_id: string;
  step_key: string;
  input?: unknown;
}): Promise<WorkflowStepRow> {
  const { data, error } = await supabase
    .from("workflow_steps")
    .insert({
      run_id: args.run_id,
      step_key: args.step_key,
      status: "running",
      started_at: new Date().toISOString(),
      input_json: (args.input ?? {}) as Json,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as WorkflowStepRow;
}

async function finishStep(
  run_id: string,
  step_key: string,
  status: "completed" | "failed",
  patch: Json,
): Promise<void> {
  const { error } = await supabase
    .from("workflow_steps")
    .update({ status, completed_at: new Date().toISOString(), ...patch })
    .eq("run_id", run_id)
    .eq("step_key", step_key);
  if (error) throw error;
}

export async function completeStep(args: {
  run_id: string;
  step_key: string;
  output?: unknown;
}): Promise<void> {
  await finishStep(args.run_id, args.step_key, "completed", {
    output_json: (args.output ?? {}) as Json,
  });
}

export async function failStep(args: {
  run_id: string;
  step_key: string;
  error?: unknown;
}): Promise<void> {
  await finishStep(args.run_id, args.step_key, "failed", {
    error_json: (args.error ?? {}) as Json,
  });
}

/**
 * Nucleus execution path: runs each workflow step through the Nucleus adapter.
 */
export async function startNucleusWorkflow(workflow: any, organizationId: string) {
  const adapter = new NucleusWorkflowAdapter(
    organizationId,
    process.env.VITE_NUCLEUS_SUPABASE_URL!,
    process.env.VITE_NUCLEUS_SUPABASE_ANON_KEY!,
  );

  const results: any[] = [];

  for (const step of workflow.steps) {
    const event = {
      type: step.type,
      version: step.version,
      payload: {
        ...step.payload,
        organizationId,
      },
    };

    const lineage = await adapter.handleWorkflowEvent(event);
    results.push(lineage);
  }

  return {
    ok: true,
    workflowId: workflow.id,
    steps: workflow.steps.length,
    lineage: results,
  };
}
