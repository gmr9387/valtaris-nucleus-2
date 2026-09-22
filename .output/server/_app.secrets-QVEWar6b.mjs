import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { S as KeyRound, b as LockKeyhole, f as Search, g as Plus, h as RefreshCcw, s as ShieldOff } from "./_libs/lucide-react.mjs";
import { O as isRedirect, v as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { c as useCredentialProviders, d as useEnvironments, f as useMyOrgMembership, h as useProjects, l as useCredentialVersions, r as canManageSecrets, u as useCredentials } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { a as Th, i as Td, n as FieldStyles, t as Field } from "./_app.organizations-C167SJ8c.mjs";
import { i as PageHeader, n as MetricCard, r as PageBody, s as StatusPill, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./_ssr/createServerFn-BFFE07zL.mjs";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-EW5XaRGG.mjs";
import { a as rotateCredentialSchema, i as requireSupabaseAuth, n as createCredentialSchema, r as deactivateCredentialSchema } from "./_ssr/schemas-BohSmhqW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.secrets-QVEWar6b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createSecret = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => createCredentialSchema.parse(input)).handler(createSsrRpc("7213c7e3392ff6eb7fda357d82919dccec11e5a436b70ea22a6014ebba333ed5"));
var rotateSecret = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => rotateCredentialSchema.parse(input)).handler(createSsrRpc("1022704e651a69d54a85648947d572a6efce2f5846fae603654d2c11cf1b645e"));
var deactivateSecret = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => deactivateCredentialSchema.parse(input)).handler(createSsrRpc("ac90ef031dadd001c5d05ad9692755046694eecd5f906c06ca35a780f511c8ac"));
function SecretsPage() {
	const { currentOrgId } = useOrgStore();
	const membership = useMyOrgMembership(currentOrgId);
	const canManage = canManageSecrets(membership.data?.role);
	const providers = useCredentialProviders();
	const credentials = useCredentials(currentOrgId);
	const projects = useProjects(currentOrgId);
	const envs = useEnvironments(currentOrgId);
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const list = credentials.data ?? [];
		const q = query.trim().toLowerCase();
		if (!q) return list;
		return list.filter((credential) => {
			const provider = providers.data?.find((p) => p.id === credential.provider_id);
			return `${credential.label} ${provider?.label ?? ""} ${credential.status}`.toLowerCase().includes(q);
		});
	}, [
		credentials.data,
		providers.data,
		query
	]);
	const stats = (0, import_react.useMemo)(() => {
		const all = credentials.data ?? [];
		return {
			total: all.length,
			active: all.filter((credential) => credential.status === "active").length,
			deactivated: all.filter((credential) => credential.status === "deactivated").length
		};
	}, [credentials.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "INFRASTRUCTURE",
		title: "Secrets",
		description: "Tenant-scoped credential vault. Raw secrets are sealed server-side; only redacted previews and metadata reach the browser.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			disabled: !currentOrgId || !canManage,
			onClick: () => setOpen(true),
			className: "inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "New secret"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [
		!currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Select an organization",
			description: "Secrets are scoped to an organization and isolated by RLS.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-5 w-5" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Credentials",
							value: stats.total,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Active",
							value: stats.active,
							tone: "good"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Deactivated",
							value: stats.deactivated,
							tone: "warn"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative max-w-sm flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input pl-8",
								placeholder: "Search secrets…",
								value: query,
								onChange: (event) => setQuery(event.target.value)
							})]
						}), !canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-mono-xs text-muted-foreground",
							children: ["Read-only · ", membership.data?.role ?? "no role"]
						})]
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10 text-center text-sm text-muted-foreground",
						children: ["No credentials yet. ", canManage && "Click “New secret” to add one."]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-1/40 text-mono-xs text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Label" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Provider" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Scope" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Last rotated" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Created" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: filtered.map((credential) => {
								const provider = providers.data?.find((p) => p.id === credential.provider_id);
								const project = projects.data?.find((p) => p.id === credential.project_id);
								const env = envs.data?.find((e) => e.id === credential.environment_id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "cursor-pointer hover:bg-surface-2/60",
									onClick: () => setSelected(credential),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: credential.label
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: provider?.label ?? "—"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1 text-mono-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-border bg-surface-2 px-1.5 py-0.5",
												children: project?.name ?? "org-wide"
											}), env && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-border bg-surface-2 px-1.5 py-0.5",
												children: env.env_type
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: credential.status }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: credential.last_rotated_at ? new Date(credential.last_rotated_at).toLocaleDateString() : "—"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: new Date(credential.created_at).toLocaleDateString()
										}) })
									]
								}, credential.id);
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface-1 p-4 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "Storage contract:"
						}),
						" raw secrets never persist in client state or audit payloads. The server function writes an opaque",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: "encrypted_payload_ref"
						}),
						"; future KMS support can replace the reference implementation without changing this UI contract."
					]
				})
			]
		}),
		open && currentOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewSecretDialog, {
			orgId: currentOrgId,
			onClose: () => setOpen(false)
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecretDetail, {
			credential: selected,
			providerLabel: providers.data?.find((provider) => provider.id === selected.provider_id)?.label ?? "—",
			canManage,
			onClose: () => setSelected(null)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldStyles, {})
	] })] });
}
function NewSecretDialog({ orgId, onClose }) {
	const qc = useQueryClient();
	const providers = useCredentialProviders();
	const projects = useProjects(orgId);
	const envs = useEnvironments(orgId);
	const create = useServerFn(createSecret);
	const [providerId, setProviderId] = (0, import_react.useState)("");
	const [label, setLabel] = (0, import_react.useState)("");
	const [projectId, setProjectId] = (0, import_react.useState)("");
	const [environmentId, setEnvironmentId] = (0, import_react.useState)("");
	const [secret, setSecret] = (0, import_react.useState)("");
	const projectEnvs = (0, import_react.useMemo)(() => {
		if (!projectId) return [];
		return (envs.data ?? []).filter((env) => env.project_id === projectId);
	}, [envs.data, projectId]);
	const submit = useMutation({
		mutationFn: async () => {
			return create({ data: {
				organization_id: orgId,
				provider_id: providerId,
				project_id: projectId || null,
				environment_id: environmentId || null,
				label: label.trim(),
				initial_secret: secret
			} });
		},
		onSuccess: () => {
			toast.success("Secret stored");
			qc.invalidateQueries({ queryKey: ["credentials", orgId] });
			qc.invalidateQueries({ queryKey: ["audit", orgId] });
			onClose();
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogShell, {
		title: "New secret",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => {
				event.preventDefault();
				submit.mutate();
			},
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Provider",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						required: true,
						className: "input",
						value: providerId,
						onChange: (event) => setProviderId(event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select provider…"
						}), providers.data?.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: provider.id,
							children: provider.label
						}, provider.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Label",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						minLength: 2,
						maxLength: 120,
						className: "input",
						value: label,
						onChange: (event) => setLabel(event.target.value),
						placeholder: "e.g. Production OpenAI"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Project scope",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "input",
						value: projectId,
						onChange: (event) => {
							setProjectId(event.target.value);
							setEnvironmentId("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Org-wide"
						}), projects.data?.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: project.id,
							children: project.name
						}, project.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Environment scope",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "input",
						value: environmentId,
						onChange: (event) => setEnvironmentId(event.target.value),
						disabled: !projectId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All environments"
						}), projectEnvs.map((env) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: env.id,
							children: [
								env.name,
								" · ",
								env.env_type
							]
						}, env.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Secret value",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						minLength: 8,
						type: "password",
						autoComplete: "off",
						spellCheck: false,
						className: "input font-mono",
						value: secret,
						onChange: (event) => setSecret(event.target.value),
						placeholder: "sk-…"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mono-xs text-muted-foreground",
					children: "The raw value is transmitted to the server function once, sealed, and discarded. Only a redacted preview returns."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "h-9 rounded-md border border-border bg-surface-2 px-3 text-sm hover:bg-surface-3",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: submit.isPending,
						className: "h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
						children: submit.isPending ? "Sealing…" : "Store secret"
					})]
				})
			]
		})
	});
}
function SecretDetail({ credential, providerLabel, canManage, onClose }) {
	const qc = useQueryClient();
	const versions = useCredentialVersions(credential.id);
	const rotate = useServerFn(rotateSecret);
	const deactivate = useServerFn(deactivateSecret);
	const [rotating, setRotating] = (0, import_react.useState)(false);
	const [newSecret, setNewSecret] = (0, import_react.useState)("");
	const doRotate = useMutation({
		mutationFn: async () => rotate({ data: {
			credential_id: credential.id,
			new_secret: newSecret,
			reason: "manual"
		} }),
		onSuccess: () => {
			toast.success("Rotated");
			setNewSecret("");
			setRotating(false);
			qc.invalidateQueries({ queryKey: ["credentials", credential.organization_id] });
			qc.invalidateQueries({ queryKey: ["credential-versions", credential.id] });
			qc.invalidateQueries({ queryKey: ["audit", credential.organization_id] });
		},
		onError: (error) => toast.error(error.message)
	});
	const doDeactivate = useMutation({
		mutationFn: async () => deactivate({ data: { credential_id: credential.id } }),
		onSuccess: () => {
			toast.success("Deactivated");
			qc.invalidateQueries({ queryKey: ["credentials", credential.organization_id] });
			qc.invalidateQueries({ queryKey: ["credential-versions", credential.id] });
			qc.invalidateQueries({ queryKey: ["audit", credential.organization_id] });
			onClose();
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogShell, {
		title: credential.label,
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface-2/50 p-3 text-mono-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "Provider"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-foreground",
							children: providerLabel
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: credential.status })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "Created"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: new Date(credential.created_at).toLocaleString() })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "Last rotated"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: credential.last_rotated_at ? new Date(credential.last_rotated_at).toLocaleString() : "—" })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-mono-xs uppercase tracking-wider text-muted-foreground",
					children: "Version history"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-md border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-2 text-mono-xs text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "#" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Preview" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Active" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Created" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border bg-surface-1",
							children: versions.data?.map((version) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono",
									children: ["v", version.version_number]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: version.redacted_preview ?? "••••"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: version.is_active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									status: "active",
									children: "active"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-mono-xs text-muted-foreground",
									children: "—"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: new Date(version.created_at).toLocaleString()
								}) })
							] }, version.id))
						})]
					})
				})] }),
				canManage && credential.status !== "deactivated" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 rounded-lg border border-border p-3",
					children: rotating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (event) => {
							event.preventDefault();
							doRotate.mutate();
						},
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "New secret value",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 8,
								type: "password",
								className: "input font-mono",
								value: newSecret,
								onChange: (event) => setNewSecret(event.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setRotating(false);
									setNewSecret("");
								},
								className: "h-8 rounded-md border border-border bg-surface-2 px-3 text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: doRotate.isPending,
								className: "h-8 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50",
								children: doRotate.isPending ? "Rotating…" : "Confirm rotate"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-mono-xs text-muted-foreground",
							children: "Manage credential lifecycle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setRotating(true),
								className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs hover:bg-surface-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "h-3 w-3" }), "Rotate"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => doDeactivate.mutate(),
								disabled: doDeactivate.isPending,
								className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-status-denied/30 bg-status-denied/10 px-3 text-xs text-status-denied hover:bg-status-denied/20 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "h-3 w-3" }), "Deactivate"]
							})]
						})]
					})
				})
			]
		})
	});
}
function DialogShell({ title, children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-xl border border-border bg-surface-1 shadow-xl",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "text-muted-foreground hover:text-foreground",
					children: "✕"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children
			})]
		})
	});
}
//#endregion
export { SecretsPage as component };
