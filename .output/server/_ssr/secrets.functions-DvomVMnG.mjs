import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { a as rotateCredentialSchema, i as requireSupabaseAuth, n as createCredentialSchema, r as deactivateCredentialSchema, t as buildRedactedPreview } from "./schemas-BohSmhqW.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/secrets.functions-DvomVMnG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SUPABASE_URL = "https://xkdlmilqrzxpnvxrbtit.supabase.co";
var SERVICE_ROLE_KEY = processModule.env.SUPABASE_SERVICE_ROLE_KEY;
function adminClient() {
	if (!SERVICE_ROLE_KEY) throw new Error("Missing Supabase service-role server environment.");
	return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
}
function makePayloadRef() {
	return `kms_pending:${crypto.randomUUID()}`;
}
async function assertOwnerOrAdmin(args) {
	const { data, error } = await args.admin.rpc("has_org_role", {
		_org: args.organizationId,
		_user: args.userId,
		_roles: ["owner", "admin"]
	});
	if (error) throw new Error(error.message);
	if (!data) throw new Error("Owner or admin role required.");
}
var createSecret_createServerFn_handler = createServerRpc({
	id: "7213c7e3392ff6eb7fda357d82919dccec11e5a436b70ea22a6014ebba333ed5",
	name: "createSecret",
	filename: "src/lib/secrets.functions.ts"
}, (opts) => createSecret.__executeServer(opts));
var createSecret = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => createCredentialSchema.parse(input)).handler(createSecret_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const admin = adminClient();
	await assertOwnerOrAdmin({
		admin,
		organizationId: data.organization_id,
		userId
	});
	const correlationId = crypto.randomUUID();
	const credIns = await admin.from("credentials").insert({
		organization_id: data.organization_id,
		provider_id: data.provider_id,
		project_id: data.project_id ?? null,
		environment_id: data.environment_id ?? null,
		label: data.label,
		status: "active",
		created_by: userId,
		last_rotated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).select().single();
	if (credIns.error) throw new Error(credIns.error.message);
	const versionIns = await admin.from("credential_versions").insert({
		credential_id: credIns.data.id,
		version_number: 1,
		encrypted_payload_ref: makePayloadRef(),
		redacted_preview: buildRedactedPreview(data.initial_secret),
		created_by: userId,
		is_active: true
	}).select("id, version_number, redacted_preview").single();
	if (versionIns.error) throw new Error(versionIns.error.message);
	await admin.from("credential_rotation_events").insert({
		credential_id: credIns.data.id,
		previous_version_id: null,
		next_version_id: versionIns.data.id,
		rotation_reason: "initial",
		triggered_by: userId
	});
	await admin.from("audit_events").insert({
		organization_id: data.organization_id,
		user_id: userId,
		module: "secrets",
		entity_type: "credential",
		entity_id: credIns.data.id,
		action: "create",
		correlation_id: correlationId,
		after_json: {
			label: data.label,
			provider_id: data.provider_id,
			version: 1,
			redacted_preview: versionIns.data.redacted_preview
		}
	});
	return {
		credential_id: credIns.data.id,
		version_id: versionIns.data.id
	};
});
var rotateSecret_createServerFn_handler = createServerRpc({
	id: "1022704e651a69d54a85648947d572a6efce2f5846fae603654d2c11cf1b645e",
	name: "rotateSecret",
	filename: "src/lib/secrets.functions.ts"
}, (opts) => rotateSecret.__executeServer(opts));
var rotateSecret = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => rotateCredentialSchema.parse(input)).handler(rotateSecret_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const admin = adminClient();
	const cred = await admin.from("credentials").select("id, organization_id").eq("id", data.credential_id).single();
	if (cred.error) throw new Error(cred.error.message);
	await assertOwnerOrAdmin({
		admin,
		organizationId: cred.data.organization_id,
		userId
	});
	const correlationId = crypto.randomUUID();
	const prev = await admin.from("credential_versions").select("id, version_number").eq("credential_id", data.credential_id).eq("is_active", true).maybeSingle();
	if (prev.error) throw new Error(prev.error.message);
	if (prev.data) {
		const deact = await admin.from("credential_versions").update({ is_active: false }).eq("id", prev.data.id);
		if (deact.error) throw new Error(deact.error.message);
	}
	const nextNumber = (prev.data?.version_number ?? 0) + 1;
	const versionIns = await admin.from("credential_versions").insert({
		credential_id: data.credential_id,
		version_number: nextNumber,
		encrypted_payload_ref: makePayloadRef(),
		redacted_preview: buildRedactedPreview(data.new_secret),
		created_by: userId,
		is_active: true
	}).select("id, version_number, redacted_preview").single();
	if (versionIns.error) throw new Error(versionIns.error.message);
	const upd = await admin.from("credentials").update({
		last_rotated_at: (/* @__PURE__ */ new Date()).toISOString(),
		status: "active"
	}).eq("id", data.credential_id);
	if (upd.error) throw new Error(upd.error.message);
	await admin.from("credential_rotation_events").insert({
		credential_id: data.credential_id,
		previous_version_id: prev.data?.id ?? null,
		next_version_id: versionIns.data.id,
		rotation_reason: data.reason,
		triggered_by: userId
	});
	await admin.from("audit_events").insert({
		organization_id: cred.data.organization_id,
		user_id: userId,
		module: "secrets",
		entity_type: "credential",
		entity_id: data.credential_id,
		action: "rotate_secret",
		correlation_id: correlationId,
		after_json: {
			version: nextNumber,
			reason: data.reason,
			redacted_preview: versionIns.data.redacted_preview
		}
	});
	return {
		version_id: versionIns.data.id,
		version_number: nextNumber
	};
});
var deactivateSecret_createServerFn_handler = createServerRpc({
	id: "ac90ef031dadd001c5d05ad9692755046694eecd5f906c06ca35a780f511c8ac",
	name: "deactivateSecret",
	filename: "src/lib/secrets.functions.ts"
}, (opts) => deactivateSecret.__executeServer(opts));
var deactivateSecret = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => deactivateCredentialSchema.parse(input)).handler(deactivateSecret_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const admin = adminClient();
	const cred = await admin.from("credentials").select("id, organization_id").eq("id", data.credential_id).single();
	if (cred.error) throw new Error(cred.error.message);
	await assertOwnerOrAdmin({
		admin,
		organizationId: cred.data.organization_id,
		userId
	});
	const correlationId = crypto.randomUUID();
	const upd = await admin.from("credentials").update({ status: "deactivated" }).eq("id", data.credential_id);
	if (upd.error) throw new Error(upd.error.message);
	const versions = await admin.from("credential_versions").update({ is_active: false }).eq("credential_id", data.credential_id).eq("is_active", true);
	if (versions.error) throw new Error(versions.error.message);
	await admin.from("audit_events").insert({
		organization_id: cred.data.organization_id,
		user_id: userId,
		module: "secrets",
		entity_type: "credential",
		entity_id: data.credential_id,
		action: "delete",
		correlation_id: correlationId,
		after_json: { status: "deactivated" }
	});
	return { ok: true };
});
//#endregion
export { createSecret_createServerFn_handler, deactivateSecret_createServerFn_handler, rotateSecret_createServerFn_handler };
