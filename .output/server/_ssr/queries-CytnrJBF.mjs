import { t as supabase } from "./client-CEGIMAqI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-context-BNAOXFcn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CytnrJBF.js
/**
* Current user organizations.
* RLS limits this to orgs where the user is a member.
*/
function useMyOrganizations() {
	const { user } = useAuth();
	return useQuery({
		enabled: !!user,
		queryKey: ["my-orgs", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("organizations").select("*").order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 3e4
	});
}
function useMyOrgMembership(orgId) {
	const { user } = useAuth();
	return useQuery({
		enabled: !!orgId && !!user,
		queryKey: [
			"my-org-membership",
			orgId,
			user?.id
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("organization_members").select("id, organization_id, user_id, role, created_at").eq("organization_id", orgId).eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data ?? null;
		},
		staleTime: 3e4
	});
}
function useOrgMembers(orgId) {
	return useQuery({
		enabled: !!orgId,
		queryKey: ["org-members", orgId],
		queryFn: async () => {
			const joined = await supabase.from("organization_members").select("id, organization_id, user_id, role, created_at, profiles:profiles!organization_members_user_id_fkey(id, email, full_name, avatar_url)").eq("organization_id", orgId).order("created_at", { ascending: true });
			if (!joined.error) return joined.data ?? [];
			const fallback = await supabase.from("organization_members").select("id, organization_id, user_id, role, created_at").eq("organization_id", orgId).order("created_at", { ascending: true });
			if (fallback.error) throw fallback.error;
			return fallback.data ?? [];
		},
		staleTime: 3e4
	});
}
function useProjects(orgId) {
	return useQuery({
		enabled: !!orgId,
		queryKey: ["projects", orgId],
		queryFn: async () => {
			const { data, error } = await supabase.from("projects").select("*").eq("organization_id", orgId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 3e4
	});
}
function useEnvironments(orgId) {
	return useQuery({
		enabled: !!orgId,
		queryKey: ["envs", orgId],
		queryFn: async () => {
			const projects = await supabase.from("projects").select("id, name").eq("organization_id", orgId);
			if (projects.error) throw projects.error;
			const projectRows = projects.data ?? [];
			const projectIds = projectRows.map((project) => project.id);
			if (projectIds.length === 0) return [];
			const envs = await supabase.from("environments").select("*").in("project_id", projectIds).order("created_at", { ascending: false });
			if (envs.error) throw envs.error;
			const projectNameById = Object.fromEntries(projectRows.map((project) => [project.id, project.name]));
			return (envs.data ?? []).map((env) => ({
				...env,
				project_name: projectNameById[env.project_id]
			}));
		},
		staleTime: 3e4
	});
}
function useAuditEvents(orgId, limit = 200) {
	return useQuery({
		enabled: !!orgId,
		queryKey: [
			"audit",
			orgId,
			limit
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("audit_events").select("*").eq("organization_id", orgId).order("created_at", { ascending: false }).limit(limit);
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 15e3
	});
}
/**
* Phase 2: credential providers catalog.
*/
function useCredentialProviders() {
	const { user } = useAuth();
	return useQuery({
		enabled: !!user,
		queryKey: ["credential-providers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("credential_providers").select("*").order("label", { ascending: true });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 6e4
	});
}
/**
* Phase 2: credential metadata only.
* No raw secrets and no encrypted_payload_ref are selected here.
*/
function useCredentials(orgId) {
	return useQuery({
		enabled: !!orgId,
		queryKey: ["credentials", orgId],
		queryFn: async () => {
			const joined = await supabase.from("credentials").select(`
          id,
          organization_id,
          project_id,
          environment_id,
          provider_id,
          label,
          status,
          created_by,
          last_rotated_at,
          created_at,
          updated_at,
          credential_providers(id, key, label, category, supports_rotation, supports_oauth, created_at),
          projects(id, name, slug),
          environments(id, name, env_type)
        `).eq("organization_id", orgId).order("created_at", { ascending: false });
			if (!joined.error) return joined.data ?? [];
			const fallback = await supabase.from("credentials").select("id, organization_id, project_id, environment_id, provider_id, label, status, created_by, last_rotated_at, created_at, updated_at").eq("organization_id", orgId).order("created_at", { ascending: false });
			if (fallback.error) throw fallback.error;
			return fallback.data ?? [];
		},
		staleTime: 2e4
	});
}
/**
* Phase 2: credential version metadata.
* This intentionally does not select encrypted_payload_ref.
*/
function useCredentialVersions(credentialId) {
	return useQuery({
		enabled: !!credentialId,
		queryKey: ["credential-versions", credentialId],
		queryFn: async () => {
			const { data, error } = await supabase.from("credential_versions").select("id, credential_id, version_number, redacted_preview, created_by, created_at, is_active").eq("credential_id", credentialId).order("version_number", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 2e4
	});
}
/**
* Phase 2: connector catalog.
*/
function useConnectors() {
	const { user } = useAuth();
	return useQuery({
		enabled: !!user,
		queryKey: ["connectors"],
		queryFn: async () => {
			const { data, error } = await supabase.from("connectors").select("*").order("label", { ascending: true });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 6e4
	});
}
function useConnectorCapabilities() {
	const { user } = useAuth();
	return useQuery({
		enabled: !!user,
		queryKey: ["connector-capabilities"],
		queryFn: async () => {
			const { data, error } = await supabase.from("connector_capabilities").select("*").order("capability_label", { ascending: true });
			if (error) throw error;
			return data ?? [];
		},
		staleTime: 6e4
	});
}
/**
* Phase 2: connector bindings for selected org.
*/
function useConnectorBindings(orgId) {
	return useQuery({
		enabled: !!orgId,
		queryKey: ["connector-bindings", orgId],
		queryFn: async () => {
			const joined = await supabase.from("connector_bindings").select(`
          id,
          organization_id,
          project_id,
          environment_id,
          connector_id,
          credential_id,
          status,
          created_by,
          created_at,
          updated_at,
          connectors(id, key, label, category, status, documentation_url, supports_webhooks, supports_oauth, created_at),
          credentials(id, label, status, provider_id),
          projects(id, name, slug),
          environments(id, name, env_type)
        `).eq("organization_id", orgId).order("created_at", { ascending: false });
			if (!joined.error) return joined.data ?? [];
			const fallback = await supabase.from("connector_bindings").select("id, organization_id, project_id, environment_id, connector_id, credential_id, status, created_by, created_at, updated_at").eq("organization_id", orgId).order("created_at", { ascending: false });
			if (fallback.error) throw fallback.error;
			return fallback.data ?? [];
		},
		staleTime: 2e4
	});
}
/**
* Permission helpers for UI only.
* Real enforcement still belongs to Supabase RLS + server functions.
*/
function canManageOrg(role) {
	return role === "owner" || role === "admin";
}
function canManageProjects(role) {
	return role === "owner" || role === "admin" || role === "manager";
}
function canManageSecrets(role) {
	return role === "owner" || role === "admin";
}
//#endregion
export { useConnectorBindings as a, useCredentialProviders as c, useEnvironments as d, useMyOrgMembership as f, useProjects as h, useAuditEvents as i, useCredentialVersions as l, useOrgMembers as m, canManageProjects as n, useConnectorCapabilities as o, useMyOrganizations as p, canManageSecrets as r, useConnectors as s, canManageOrg as t, useCredentials as u };
