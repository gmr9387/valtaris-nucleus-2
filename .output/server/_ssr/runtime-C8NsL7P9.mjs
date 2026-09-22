import { t as supabase } from "./client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as useMyOrgMembership } from "./queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./org-store-DHMPJw-C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/runtime-C8NsL7P9.js
var import_jsx_runtime = require_jsx_runtime();
var RULES = {
	"org:manage": ["owner", "admin"],
	"org:delete": ["owner"],
	"members:manage": ["owner", "admin"],
	"projects:manage": [
		"owner",
		"admin",
		"manager"
	],
	"environments:manage": [
		"owner",
		"admin",
		"manager"
	],
	"secrets:manage": ["owner", "admin"],
	"secrets:read": [
		"owner",
		"admin",
		"manager"
	],
	"connectors:manage": ["owner", "admin"],
	"connectors:read": [
		"owner",
		"admin",
		"manager",
		"operator",
		"viewer"
	],
	"audit:read": [
		"owner",
		"admin",
		"manager",
		"operator",
		"viewer"
	],
	"telemetry:read": [
		"owner",
		"admin",
		"manager",
		"operator",
		"viewer"
	],
	"workflows:read": [
		"owner",
		"admin",
		"manager",
		"operator",
		"viewer"
	],
	"workflows:create": [
		"owner",
		"admin",
		"manager"
	],
	"workflows:update": [
		"owner",
		"admin",
		"manager"
	],
	"workflows:publish": ["owner", "admin"],
	"workflows:run": [
		"owner",
		"admin",
		"manager",
		"operator"
	],
	"workflows:cancel": [
		"owner",
		"admin",
		"manager",
		"operator"
	],
	"workflows:admin": ["owner", "admin"]
};
function roleHas(role, perm) {
	if (!role) return false;
	return RULES[perm].includes(role);
}
function usePermissions() {
	const { currentOrgId } = useOrgStore();
	const membership = useMyOrgMembership(currentOrgId);
	const role = membership.data?.role ?? null;
	return {
		role,
		loading: membership.isLoading,
		can: (perm) => roleHas(role, perm),
		isViewer: role === "viewer",
		isOwner: role === "owner"
	};
}
/**
* Render children only when the current user has the given permission
* within the active organization. Frontend convenience; server-side RLS
* remains the source of truth.
*/
function PermissionGate({ permission, fallback = null, children }) {
	const { can, loading } = usePermissions();
	if (loading) return null;
	if (!can(permission)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
async function currentUserId() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Not authenticated");
	return data.user.id;
}
async function audit(args) {
	const actor_id = await currentUserId().catch(() => null);
	await supabase.from("workflow_audit_events").insert({
		organization_id: args.organization_id,
		workflow_id: args.workflow_id ?? null,
		run_id: args.run_id ?? null,
		event_type: args.event_type,
		actor_id,
		payload: args.payload ?? {}
	});
}
async function createWorkflow(args) {
	const created_by = await currentUserId();
	const { data, error } = await supabase.from("workflows").insert({
		organization_id: args.organization_id,
		name: args.name,
		description: args.description ?? null,
		created_by
	}).select("*").single();
	if (error) throw error;
	await audit({
		organization_id: args.organization_id,
		workflow_id: data.id,
		event_type: "workflow.created",
		payload: { name: args.name }
	});
	return data;
}
async function archiveWorkflow(args) {
	const { error } = await supabase.from("workflows").update({ status: "archived" }).eq("id", args.workflow_id);
	if (error) throw error;
	await audit({
		organization_id: args.organization_id,
		workflow_id: args.workflow_id,
		event_type: "workflow.archived"
	});
}
async function createDraftVersion(args) {
	const created_by = await currentUserId();
	const { data: latest, error: latestError } = await supabase.from("workflow_versions").select("version_number").eq("workflow_id", args.workflow_id).order("version_number", { ascending: false }).limit(1).maybeSingle();
	if (latestError) throw latestError;
	const version_number = (latest?.version_number ?? 0) + 1;
	const { data, error } = await supabase.from("workflow_versions").insert({
		workflow_id: args.workflow_id,
		version_number,
		definition_json: args.definition,
		created_by
	}).select("*").single();
	if (error) throw error;
	await audit({
		organization_id: args.organization_id,
		workflow_id: args.workflow_id,
		event_type: "workflow.version.drafted",
		payload: { version_number }
	});
	return data;
}
async function publishVersion(args) {
	const { error } = await supabase.from("workflow_versions").update({
		status: "published",
		published_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", args.version_id);
	if (error) throw error;
	const { error: wfError } = await supabase.from("workflows").update({ status: "active" }).eq("id", args.workflow_id);
	if (wfError) throw wfError;
	await audit({
		organization_id: args.organization_id,
		workflow_id: args.workflow_id,
		event_type: "workflow.version.published",
		payload: { version_id: args.version_id }
	});
}
async function startWorkflow(args) {
	const created_by = await currentUserId();
	const { data, error } = await supabase.from("workflow_runs").insert({
		organization_id: args.organization_id,
		workflow_id: args.workflow_id,
		version_id: args.version_id,
		status: "running",
		started_at: (/* @__PURE__ */ new Date()).toISOString(),
		input_json: args.input ?? {},
		created_by
	}).select("*").single();
	if (error) throw error;
	await audit({
		organization_id: args.organization_id,
		workflow_id: args.workflow_id,
		run_id: data.id,
		event_type: "workflow.run.started"
	});
	return data;
}
async function finishRun(organization_id, run_id, status, patch = {}) {
	const { error } = await supabase.from("workflow_runs").update({
		status,
		completed_at: (/* @__PURE__ */ new Date()).toISOString(),
		...patch
	}).eq("id", run_id);
	if (error) throw error;
	await audit({
		organization_id,
		run_id,
		event_type: `workflow.run.${status}`,
		payload: patch
	});
}
async function completeWorkflow(organizationId, runId, output) {
	await finishRun(organizationId, runId, "completed", { output_json: output ?? {} });
}
async function failWorkflow(organizationId, runId, error) {
	await finishRun(organizationId, runId, "failed", { error_json: error ?? {} });
}
async function cancelWorkflow(organizationId, runId, reason) {
	await finishRun(organizationId, runId, "cancelled", { error_json: { reason: reason ?? "Cancelled" } });
}
async function startStep(args) {
	const { data, error } = await supabase.from("workflow_steps").insert({
		run_id: args.run_id,
		step_key: args.step_key,
		status: "running",
		started_at: (/* @__PURE__ */ new Date()).toISOString(),
		input_json: args.input ?? {}
	}).select("*").single();
	if (error) throw error;
	return data;
}
async function finishStep(run_id, step_key, status, patch) {
	const { error } = await supabase.from("workflow_steps").update({
		status,
		completed_at: (/* @__PURE__ */ new Date()).toISOString(),
		...patch
	}).eq("run_id", run_id).eq("step_key", step_key);
	if (error) throw error;
}
async function completeStep(args) {
	await finishStep(args.run_id, args.step_key, "completed", { output_json: args.output ?? {} });
}
async function failStep(args) {
	await finishStep(args.run_id, args.step_key, "failed", { error_json: args.error ?? {} });
}
//#endregion
export { completeWorkflow as a, failStep as c, startStep as d, startWorkflow as f, completeStep as i, failWorkflow as l, archiveWorkflow as n, createDraftVersion as o, cancelWorkflow as r, createWorkflow as s, PermissionGate as t, publishVersion as u };
