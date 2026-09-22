import { n as __toESM } from "./_runtime.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "./_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { B as ChevronDown, C as GitBranch, F as Circle, S as KeyRound, T as FolderKanban, U as Building2, V as Check, Y as Activity, _ as PlugZap, c as ShieldCheck, d as Server, j as Cpu, k as FileStack, p as ScrollText, r as Users, t as Workflow, u as Settings, x as LayoutDashboard, y as LogOut, z as ChevronRight } from "./_libs/lucide-react.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./_ssr/auth-context-BNAOXFcn.mjs";
import { p as useMyOrganizations } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { n as logAudit, t as createCorrelationId } from "./_ssr/audit-CST1_a7C.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-BbAwUTR6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		label: "PLATFORM",
		items: [
			{
				to: "/dashboard",
				label: "Overview",
				icon: LayoutDashboard
			},
			{
				to: "/organizations",
				label: "Organizations",
				icon: Building2
			},
			{
				to: "/projects",
				label: "Projects",
				icon: FolderKanban
			},
			{
				to: "/environments",
				label: "Environments",
				icon: Server
			},
			{
				to: "/users",
				label: "Users & Roles",
				icon: Users
			},
			{
				to: "/audit",
				label: "Audit",
				icon: ScrollText
			}
		]
	},
	{
		label: "OBSERVABILITY",
		items: [{
			to: "/telemetry",
			label: "Telemetry",
			icon: Activity,
			phase: "P1"
		}]
	},
	{
		label: "INFRASTRUCTURE",
		items: [
			{
				to: "/secrets",
				label: "Secrets",
				icon: KeyRound,
				phase: "P2"
			},
			{
				to: "/connectors",
				label: "Connectors",
				icon: PlugZap,
				phase: "P2"
			},
			{
				to: "/workflows",
				label: "Workflows",
				icon: Workflow,
				phase: "P3"
			},
			{
				to: "/core",
				label: "Core",
				icon: Cpu,
				phase: "P1"
			}
		]
	},
	{
		label: "KNOWLEDGE",
		items: [{
			to: "/evidence",
			label: "Evidence",
			icon: FileStack,
			phase: "P4"
		}, {
			to: "/decisions",
			label: "Decisions",
			icon: GitBranch,
			phase: "P5"
		}]
	},
	{
		label: "GOVERN",
		items: [{
			to: "/governance",
			label: "Governance",
			icon: ShieldCheck,
			phase: "P6"
		}]
	}
];
function AppSidebar() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-14 items-center gap-2 border-b border-sidebar-border px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-7 w-7 place-items-center rounded-md bg-primary text-[11px] font-black text-primary-foreground",
					children: "V"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tracking-tight",
						children: "ValtariOS Core"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Modular Monolith"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto px-2 py-3",
				children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 pb-1.5 text-[10px] font-medium tracking-widest text-muted-foreground",
						children: group.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-0.5",
						children: group.items.map((item) => {
							const active = pathname === item.to || pathname.startsWith(`${item.to}/`) || pathname === `/_app${item.to}` || pathname.startsWith(`/_app${item.to}/`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "group flex h-8 items-center justify-between rounded-md px-2 text-[13px] transition-colors " + (active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: `h-3.5 w-3.5 ${active ? "text-primary" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: item.label
									})]
								}), item.phase && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border border-sidebar-border bg-sidebar/40 px-1.5 py-0.5 text-[9px] tracking-widest text-muted-foreground/80 group-hover:text-muted-foreground",
									children: item.phase
								})]
							}) }, item.to);
						})
					})]
				}, group.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-sidebar-border p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-sidebar-border bg-sidebar/40 p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-mono-xs text-muted-foreground",
							children: "CORE STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-sidebar-foreground",
							children: "Phase 1 foundation active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 rounded-full bg-sidebar-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[40%] rounded-full bg-primary" })
						})
					]
				})
			})
		]
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function OrgSwitcher() {
	const orgs = useMyOrganizations();
	const { currentOrgId, setCurrentOrgId } = useOrgStore();
	const current = orgs.data?.find((organization) => organization.id === currentOrgId) ?? orgs.data?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		className: "group flex h-8 items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 text-sm hover:bg-surface-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-4 w-4 items-center justify-center rounded-sm bg-primary/15 text-[10px] font-semibold text-primary",
				children: current?.name?.[0]?.toUpperCase() ?? "·"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "max-w-[180px] truncate",
				children: current?.name ?? "Select organization"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "start",
		className: "w-72",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground",
				children: "Organizations"
			}),
			orgs.data?.length ? orgs.data.map((organization) => {
				const selected = organization.id === current?.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: async () => {
						if (organization.id === currentOrgId) return;
						const correlationId = createCorrelationId();
						setCurrentOrgId(organization.id);
						await logAudit({
							organization_id: organization.id,
							module: "tenancy",
							entity_type: "organization",
							entity_id: organization.id,
							action: "switch_org",
							after: {
								organization_id: organization.id,
								organization_name: organization.name
							},
							correlation_id: correlationId
						});
					},
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate",
								children: organization.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-mono text-[10px] text-muted-foreground",
								children: organization.slug
							})]
						})]
					}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0 text-primary" })]
				}, organization.id);
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 py-1.5 text-xs text-muted-foreground",
				children: "No organizations yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/organizations",
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3.5 w-3.5" }), "Manage organizations"]
				})
			})
		]
	})] });
}
function AppLayout() {
	const { session, loading, user, signOut } = useAuth();
	const navigate = useNavigate();
	const orgs = useMyOrganizations();
	const { currentOrgId, setCurrentOrgId } = useOrgStore();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		if (!loading && !session) navigate({
			to: "/login",
			replace: true
		});
	}, [
		loading,
		session,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!orgs.data || orgs.data.length === 0) return;
		const currentIsValid = orgs.data.some((org) => org.id === currentOrgId);
		if (!currentOrgId || !currentIsValid) setCurrentOrgId(orgs.data[0].id);
	}, [
		orgs.data,
		currentOrgId,
		setCurrentOrgId
	]);
	if (loading || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-mono-xs text-muted-foreground",
			children: "LOADING…"
		})
	});
	const title = pageTitleFromPath(pathname);
	const canShowOrgPrompt = orgs.data && orgs.data.length === 0 && pathname !== "/organizations" && pathname !== "/_app/organizations";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface-1/60 px-5 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgSwitcher, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-border-strong",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm font-medium",
							children: title
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						currentOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden rounded border border-border bg-surface-2 px-2 py-1 font-mono text-[10px] text-muted-foreground lg:inline",
							children: ["ORG ", currentOrgId.slice(0, 8)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs text-muted-foreground sm:inline",
							children: user?.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								const correlationId = createCorrelationId();
								await logAudit({
									organization_id: currentOrgId,
									module: "auth",
									entity_type: "user",
									entity_id: user?.id ?? null,
									action: "sign_out",
									correlation_id: correlationId
								});
								await signOut();
								setCurrentOrgId(null);
								navigate({
									to: "/login",
									replace: true
								});
							},
							className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 text-xs text-muted-foreground hover:text-foreground",
							title: "Sign out",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Sign out"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-auto",
				children: canShowOrgPrompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyOrgPrompt, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
function EmptyOrgPrompt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-lg border border-border bg-surface-1 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mono-xs text-primary",
					children: "NO_ORGANIZATION"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-semibold",
					children: "Create your first organization"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Every resource in ValtariOS Core belongs to an organization."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/organizations",
					className: "mt-5 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Go to organizations"
				})
			]
		})
	});
}
function pageTitleFromPath(pathname) {
	const segment = pathname.replace(/^\/_app/, "").split("/").filter(Boolean)[0] ?? "dashboard";
	return {
		dashboard: "Overview",
		organizations: "Organizations",
		projects: "Projects",
		environments: "Environments",
		users: "Users",
		audit: "Audit",
		telemetry: "Telemetry",
		secrets: "Secrets",
		connectors: "Connectors",
		workflows: "Workflows",
		core: "Core",
		evidence: "Evidence",
		decisions: "Decisions",
		governance: "Governance"
	}[segment] ?? segment;
}
//#endregion
export { AppLayout as component };
