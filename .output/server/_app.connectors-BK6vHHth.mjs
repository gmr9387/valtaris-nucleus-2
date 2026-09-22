import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { G as BookOpen, I as CircleX, L as CircleQuestionMark, R as CircleCheck, S as KeyRound, _ as PlugZap, f as Search, g as Plus, i as TriangleAlert, n as Webhook } from "./_libs/lucide-react.mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/auth-context-BNAOXFcn.mjs";
import { a as useConnectorBindings$1, d as useEnvironments, f as useMyOrgMembership, h as useProjects, o as useConnectorCapabilities$1, s as useConnectors$1, t as canManageOrg, u as useCredentials$1 } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { n as logAudit } from "./_ssr/audit-CST1_a7C.mjs";
import { a as Th, i as Td, n as FieldStyles, t as Field } from "./_app.organizations-C167SJ8c.mjs";
import { i as PageHeader, n as MetricCard, r as PageBody, s as StatusPill, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.connectors-BK6vHHth.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HealthIndicator({ status, latencyMs }) {
	const { cls, Icon, label } = {
		healthy: {
			cls: "text-status-paid border-status-paid/30 bg-status-paid/10",
			Icon: CircleCheck,
			label: "Healthy"
		},
		degraded: {
			cls: "text-status-pending border-status-pending/30 bg-status-pending/10",
			Icon: TriangleAlert,
			label: "Degraded"
		},
		failed: {
			cls: "text-status-denied border-status-denied/30 bg-status-denied/10",
			Icon: CircleX,
			label: "Failed"
		},
		unknown: {
			cls: "text-muted-foreground border-border bg-surface-2",
			Icon: CircleQuestionMark,
			label: "Unknown"
		}
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-mono-xs ${cls}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }),
			label,
			typeof latencyMs === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ml-1 opacity-70",
				children: [latencyMs, "ms"]
			})
		]
	});
}
/**
* Centralized, typed TanStack Query keys.
* Single source of truth for cache identity + invalidation surfaces.
*/
var qk = {
	auth: { session: () => ["auth", "session"] },
	orgs: {
		mine: (userId) => [
			"orgs",
			"mine",
			userId
		],
		one: (orgId) => [
			"orgs",
			"one",
			orgId
		],
		members: (orgId) => [
			"orgs",
			"members",
			orgId
		],
		myMembership: (orgId, userId) => [
			"orgs",
			"membership",
			orgId,
			userId
		]
	},
	projects: {
		list: (orgId) => ["projects", orgId],
		one: (projectId) => [
			"projects",
			"one",
			projectId
		]
	},
	envs: {
		byOrg: (orgId) => ["envs", orgId],
		byProject: (projectId) => [
			"envs",
			"project",
			projectId
		]
	},
	audit: {
		list: (orgId, limit = 200) => [
			"audit",
			orgId,
			limit
		],
		recent: (userId, limit = 100) => [
			"audit",
			"recent",
			userId,
			limit
		]
	},
	credentials: {
		providers: () => ["credentials", "providers"],
		list: (orgId) => ["credentials", orgId],
		versions: (credentialId) => [
			"credentials",
			"versions",
			credentialId
		]
	},
	connectors: {
		catalog: () => ["connectors"],
		capabilities: () => ["connectors", "capabilities"],
		versions: (connectorId) => [
			"connectors",
			"versions",
			connectorId
		],
		bindings: (orgId) => [
			"connectors",
			"bindings",
			orgId
		]
	},
	health: {
		forBinding: (bindingId) => [
			"health",
			"binding",
			bindingId
		],
		latest: (bindingIds) => [
			"health",
			"latest",
			bindingIds
		]
	},
	telemetry: { events: (orgId, limit = 200) => [
		"telemetry",
		"events",
		orgId,
		limit
	] }
};
var useConnectors = useConnectors$1;
var useConnectorCapabilities = useConnectorCapabilities$1;
var useConnectorBindings = useConnectorBindings$1;
var useCredentials = useCredentials$1;
/**
* Latest connector_health_checks row per binding, keyed by binding id.
* RLS guarantees only org-scoped rows are returned.
*/
function useLatestHealthChecks(bindingIds) {
	const sorted = [...bindingIds].sort();
	return useQuery({
		enabled: sorted.length > 0,
		queryKey: qk.health.latest(sorted),
		queryFn: async () => {
			const { data, error } = await supabase.from("connector_health_checks").select("*").in("connector_binding_id", sorted).order("checked_at", { ascending: false });
			if (error) throw error;
			const map = {};
			for (const row of data ?? []) if (!map[row.connector_binding_id]) map[row.connector_binding_id] = row;
			return map;
		},
		staleTime: 15e3
	});
}
function ConnectorsPage() {
	const { currentOrgId } = useOrgStore();
	const membership = useMyOrgMembership(currentOrgId);
	const canManage = canManageOrg(membership.data?.role);
	const connectors = useConnectors();
	const caps = useConnectorCapabilities();
	const bindings = useConnectorBindings(currentOrgId);
	useCredentials(currentOrgId);
	const health = useLatestHealthChecks((bindings.data ?? []).map((b) => b.id));
	const [query, setQuery] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const list = connectors.data ?? [];
		if (!query.trim()) return list;
		const q = query.toLowerCase();
		return list.filter((c) => c.label.toLowerCase().includes(q) || c.key.toLowerCase().includes(q));
	}, [connectors.data, query]);
	const stats = (0, import_react.useMemo)(() => {
		const bs = bindings.data ?? [];
		return {
			catalog: (connectors.data ?? []).length,
			bound: bs.length,
			active: bs.filter((b) => b.status === "active").length
		};
	}, [connectors.data, bindings.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "INFRASTRUCTURE",
		title: "Connectors",
		description: "Versioned registry of external integrations, scoped to organizations through credentialed bindings."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Catalog",
							value: stats.catalog,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Bindings",
							value: stats.bound,
							tone: "neutral"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Active",
							value: stats.active,
							tone: "good"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input pl-8",
								placeholder: "Search connectors…",
								value: query,
								onChange: (e) => setQuery(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-mono-xs text-muted-foreground",
							children: [
								filtered.length,
								" of ",
								stats.catalog
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-1/40 text-mono-xs text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Connector" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Category" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Capabilities" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Bindings" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: filtered.map((c) => {
								const connectorCaps = (caps.data ?? []).filter((x) => x.connector_id === c.id);
								const connectorBindings = (bindings.data ?? []).filter((b) => b.connector_id === c.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "cursor-pointer hover:bg-surface-2/60",
									onClick: () => setSelected(c),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorAvatar, { connector: c }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium",
												children: c.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs text-muted-foreground",
												children: c.key
											})] })]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded border border-border bg-surface-2 px-1.5 py-0.5 text-mono-xs text-muted-foreground capitalize",
											children: c.category
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											status: c.status === "available" ? "active" : c.status === "beta" ? "planned" : "archived",
											children: c.status.toUpperCase()
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1",
											children: [connectorCaps.slice(0, 4).map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary",
												children: cap.capability_key
											}, cap.id)), connectorCaps.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-mono-xs text-muted-foreground",
												children: ["+", connectorCaps.length - 4]
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: connectorBindings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-mono-xs text-muted-foreground",
											children: "—"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-mono-xs",
												children: connectorBindings.length
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthIndicator, {
												status: health.data?.[connectorBindings[0].id]?.health_status ?? "unknown",
												latencyMs: health.data?.[connectorBindings[0].id]?.latency_ms
											})]
										}) })
									]
								}, c.id);
							})
						})]
					})]
				}),
				!currentOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Select an organization to manage bindings",
					description: "The catalog above is global. Bindings link a connector to a credential within an org/project/environment.",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "h-5 w-5" })
				})
			]
		}),
		selected && currentOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorPanel, {
			connector: selected,
			orgId: currentOrgId,
			canManage,
			onClose: () => setSelected(null)
		}),
		selected && !currentOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorPanel, {
			connector: selected,
			orgId: null,
			canManage: false,
			onClose: () => setSelected(null)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldStyles, {})
	] })] });
}
function ConnectorAvatar({ connector }) {
	const initial = connector.label.charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-2 text-mono-xs font-semibold text-primary",
		children: initial
	});
}
function ConnectorPanel({ connector, orgId, canManage, onClose }) {
	const caps = useConnectorCapabilities();
	const bindings = useConnectorBindings(orgId);
	const credentials = useCredentials(orgId);
	const health = useLatestHealthChecks((bindings.data ?? []).filter((b) => b.connector_id === connector.id).map((b) => b.id));
	const connectorCaps = (caps.data ?? []).filter((x) => x.connector_id === connector.id);
	const connectorBindings = (bindings.data ?? []).filter((b) => b.connector_id === connector.id);
	const projects = useProjects(orgId);
	const envs = useEnvironments(orgId);
	const { user } = useAuth();
	const qc = useQueryClient();
	const [credentialId, setCredentialId] = (0, import_react.useState)("");
	const [projectId, setProjectId] = (0, import_react.useState)("");
	const [environmentId, setEnvironmentId] = (0, import_react.useState)("");
	const matchingCreds = (credentials.data ?? []).filter((c) => c.status === "active");
	const createBinding = useMutation({
		mutationFn: async () => {
			if (!orgId || !user) throw new Error("Org required");
			const { data, error } = await supabase.from("connector_bindings").insert({
				organization_id: orgId,
				connector_id: connector.id,
				credential_id: credentialId || null,
				project_id: projectId || null,
				environment_id: environmentId || null,
				status: "active",
				created_by: user.id
			}).select().single();
			if (error) throw error;
			await logAudit({
				organization_id: orgId,
				module: "connectors",
				entity_type: "binding",
				entity_id: data.id,
				action: "create",
				after: {
					connector_id: connector.id,
					credential_id: credentialId || null
				}
			});
			return data;
		},
		onSuccess: () => {
			toast.success("Binding created");
			setCredentialId("");
			setProjectId("");
			setEnvironmentId("");
			qc.invalidateQueries({ queryKey: ["connector-bindings"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-stretch justify-end bg-background/80 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl overflow-y-auto border-l border-border bg-surface-1",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorAvatar, { connector }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-mono-xs uppercase tracking-wider text-muted-foreground",
						children: connector.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: connector.label
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "text-muted-foreground hover:text-foreground",
					children: "✕"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 text-mono-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Key",
								value: connector.key,
								mono: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Status",
								value: connector.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Webhooks",
								value: connector.supports_webhooks ? "supported" : "no"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "OAuth",
								value: connector.supports_oauth ? "supported" : "no"
							})
						]
					}),
					connector.documentation_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: connector.documentation_url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 text-mono-xs text-primary hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }), " Documentation"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-mono-xs uppercase tracking-wider text-muted-foreground",
						children: "Capabilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [connectorCaps.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded border border-primary/15 bg-primary/5 px-2 py-1 text-mono-xs text-primary",
							children: c.capability_label
						}, c.id)), connectorCaps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-mono-xs text-muted-foreground",
							children: "No capabilities registered."
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mb-2 text-mono-xs uppercase tracking-wider text-muted-foreground",
						children: ["Environment bindings ", orgId ? "" : "(select an organization)"]
					}), !orgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No org selected."
					}) : connectorBindings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No bindings yet for this organization."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-md border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-2 text-mono-xs text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Scope" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Credential" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Health" })
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border bg-surface-1",
								children: connectorBindings.map((b) => {
									const proj = projects.data?.find((p) => p.id === b.project_id);
									const env = envs.data?.find((e) => e.id === b.environment_id);
									const cred = credentials.data?.find((c) => c.id === b.credential_id);
									const h = health.data?.[b.id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1 text-mono-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-border bg-surface-2 px-1.5 py-0.5",
												children: proj?.name ?? "org-wide"
											}), env && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-border bg-surface-2 px-1.5 py-0.5",
												children: env.env_type
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: cred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs",
											children: cred.label
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-mono-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-3 w-3" }), "none"]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: b.status === "active" ? "active" : b.status === "paused" ? "planned" : "failed" }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthIndicator, {
											status: h?.health_status ?? "unknown",
											latencyMs: h?.latency_ms
										}) })
									] }, b.id);
								})
							})]
						})
					})] }),
					canManage && orgId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-mono-xs uppercase tracking-wider text-muted-foreground",
							children: "New binding"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								createBinding.mutate();
							},
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Credential",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "input",
										value: credentialId,
										onChange: (e) => setCredentialId(e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "No credential (policy only)"
										}), matchingCreds.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.id,
											children: c.label
										}, c.id))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Project",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: "input",
											value: projectId,
											onChange: (e) => setProjectId(e.target.value),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Org-wide"
											}), projects.data?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: p.id,
												children: p.name
											}, p.id))]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Environment",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: "input",
											value: environmentId,
											onChange: (e) => setEnvironmentId(e.target.value),
											disabled: !projectId,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Any"
											}), envs.data?.filter((e) => !projectId || e.project_id === projectId).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: e.id,
												children: [
													e.name,
													" · ",
													e.env_type
												]
											}, e.id))]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: createBinding.isPending,
										className: "inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
											" ",
											createBinding.isPending ? "Creating…" : "Create binding"
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface-2/40 p-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Webhook, { className: "mr-1 inline h-3 w-3" }),
							"Connector execution and health probing are out of scope for Phase 2 — this surface manages metadata and governance only. Workflow runtime will populate ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono",
								children: "connector_health_checks"
							}),
							" in Phase 3+."
						]
					})
				]
			})]
		})
	});
}
function Meta({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface-2/50 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: mono ? "font-mono text-foreground" : "text-foreground capitalize",
			children: value
		})]
	});
}
//#endregion
export { ConnectorsPage as component };
