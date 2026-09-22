import { t as supabase } from "./client-CEGIMAqI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-B99uDuNs.js
function useWorkflows(orgId) {
	return useQuery({
		enabled: !!orgId,
		queryKey: ["workflows", orgId],
		queryFn: async () => {
			const { data, error } = await supabase.from("workflows").select("*").eq("organization_id", orgId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 2e4
	});
}
function useWorkflow(workflowId) {
	return useQuery({
		enabled: !!workflowId,
		queryKey: ["workflow", workflowId],
		queryFn: async () => {
			const { data, error } = await supabase.from("workflows").select("*").eq("id", workflowId).maybeSingle();
			if (error) throw error;
			return data ?? null;
		},
		staleTime: 2e4
	});
}
function useWorkflowVersions(workflowId) {
	return useQuery({
		enabled: !!workflowId,
		queryKey: ["workflow-versions", workflowId],
		queryFn: async () => {
			const { data, error } = await supabase.from("workflow_versions").select("*").eq("workflow_id", workflowId).order("version_number", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 15e3
	});
}
function useWorkflowRuns(workflowId, limit = 100) {
	return useQuery({
		enabled: !!workflowId,
		queryKey: [
			"workflow-runs",
			workflowId,
			limit
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("workflow_runs").select("*").eq("workflow_id", workflowId).order("created_at", { ascending: false }).limit(limit);
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 1e4
	});
}
function useWorkflowRun(runId) {
	return useQuery({
		enabled: !!runId,
		queryKey: ["workflow-run", runId],
		queryFn: async () => {
			const { data, error } = await supabase.from("workflow_runs").select("*").eq("id", runId).maybeSingle();
			if (error) throw error;
			return data ?? null;
		},
		staleTime: 5e3
	});
}
function useWorkflowSteps(runId) {
	return useQuery({
		enabled: !!runId,
		queryKey: ["workflow-steps", runId],
		queryFn: async () => {
			const { data, error } = await supabase.from("workflow_steps").select("*").eq("run_id", runId).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 5e3
	});
}
function useWorkflowAuditEvents(args) {
	const { organization_id, run_id, workflow_id, limit = 100 } = args;
	return useQuery({
		enabled: !!(organization_id || run_id || workflow_id),
		queryKey: [
			"workflow-audit",
			organization_id,
			workflow_id,
			run_id,
			limit
		],
		queryFn: async () => {
			let query = supabase.from("workflow_audit_events").select("*").order("occurred_at", { ascending: false }).limit(limit);
			if (run_id) query = query.eq("run_id", run_id);
			else if (workflow_id) query = query.eq("workflow_id", workflow_id);
			else if (organization_id) query = query.eq("organization_id", organization_id);
			const { data, error } = await query;
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 5e3
	});
}
//#endregion
export { useWorkflowSteps as a, useWorkflowRuns as i, useWorkflowAuditEvents as n, useWorkflowVersions as o, useWorkflowRun as r, useWorkflows as s, useWorkflow as t };
