
-- ============================================================
-- NUCLEUS IDENTITY TABLE
-- ============================================================

create table if not exists nucleus_identity (
  id uuid primary key,
  tenant_id text not null,
  project_id text not null,
  environment text not null,
  actor jsonb not null,
  timestamp timestamptz default now()
);

create index if not exists idx_identity_tenant on nucleus_identity (tenant_id);
create index if not exists idx_identity_project on nucleus_identity (project_id);
create index if not exists idx_identity_environment on nucleus_identity (environment);

GRANT SELECT, INSERT ON public.nucleus_identity TO authenticated;
GRANT ALL ON public.nucleus_identity TO service_role;

-- ============================================================
-- NUCLEUS EVENTS TABLE
-- ============================================================

create table if not exists nucleus_events (
  id uuid primary key,
  source text not null,
  type text not null,
  context jsonb not null,
  payload jsonb not null,
  timestamp timestamptz default now()
);

create index if not exists idx_events_source on nucleus_events (source);
create index if not exists idx_events_type on nucleus_events (type);
create index if not exists idx_events_timestamp on nucleus_events (timestamp);

GRANT SELECT, INSERT ON public.nucleus_events TO authenticated;
GRANT ALL ON public.nucleus_events TO service_role;

-- ============================================================
-- NUCLEUS TELEMETRY TABLE
-- ============================================================

create table if not exists nucleus_telemetry (
  id uuid primary key,
  subsystem text not null,
  level text not null,
  message text not null,
  metadata jsonb,
  timestamp timestamptz default now()
);

create index if not exists idx_telemetry_subsystem on nucleus_telemetry (subsystem);
create index if not exists idx_telemetry_level on nucleus_telemetry (level);
create index if not exists idx_telemetry_timestamp on nucleus_telemetry (timestamp);

GRANT SELECT, INSERT ON public.nucleus_telemetry TO authenticated;
GRANT ALL ON public.nucleus_telemetry TO service_role;

-- ============================================================
-- NUCLEUS ERRORS TABLE
-- ============================================================

create table if not exists nucleus_errors (
  id uuid primary key,
  subsystem text not null,
  code text not null,
  message text not null,
  context jsonb,
  timestamp timestamptz default now()
);

create index if not exists idx_errors_subsystem on nucleus_errors (subsystem);
create index if not exists idx_errors_code on nucleus_errors (code);
create index if not exists idx_errors_timestamp on nucleus_errors (timestamp);

GRANT SELECT, INSERT ON public.nucleus_errors TO authenticated;
GRANT ALL ON public.nucleus_errors TO service_role;

-- ============================================================
-- NUCLEUS SUBSYSTEM REGISTRY TABLE
-- ============================================================

create table if not exists nucleus_subsystems (
  id text primary key,
  runtime boolean default false,
  definition boolean default false,
  health boolean default false,
  telemetry boolean default false,
  events boolean default false,
  contracts boolean default false,
  timestamp timestamptz default now()
);

create index if not exists idx_subsystems_timestamp on nucleus_subsystems (timestamp);

GRANT SELECT, INSERT ON public.nucleus_subsystems TO authenticated;
GRANT ALL ON public.nucleus_subsystems TO service_role;

-- ============================================================
-- NUCLEUS LINEAGE TABLE
-- ============================================================

create table if not exists nucleus_lineage (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null,
  chain jsonb not null,
  finalized boolean default false,
  created_at timestamptz default now(),
  finalized_at timestamptz
);

create index if not exists idx_lineage_org on nucleus_lineage (organization_id);

GRANT SELECT, INSERT, UPDATE ON public.nucleus_lineage TO authenticated;
GRANT ALL ON public.nucleus_lineage TO service_role;

-- ============================================================
-- RLS FOR nucleus tables
-- ============================================================

alter table nucleus_identity enable row level security;
create policy "identity_service_full" on nucleus_identity for all using (auth.role() = 'service_role');
create policy "identity_authenticated_read" on nucleus_identity for select to authenticated using (true);
create policy "identity_authenticated_insert" on nucleus_identity for insert to authenticated with check (true);

alter table nucleus_events enable row level security;
create policy "events_service_full" on nucleus_events for all using (auth.role() = 'service_role');
create policy "events_authenticated_read" on nucleus_events for select to authenticated using (true);
create policy "events_authenticated_insert" on nucleus_events for insert to authenticated with check (true);

alter table nucleus_telemetry enable row level security;
create policy "telemetry_service_full" on nucleus_telemetry for all using (auth.role() = 'service_role');
create policy "telemetry_authenticated_read" on nucleus_telemetry for select to authenticated using (true);
create policy "telemetry_authenticated_insert" on nucleus_telemetry for insert to authenticated with check (true);

alter table nucleus_errors enable row level security;
create policy "errors_service_full" on nucleus_errors for all using (auth.role() = 'service_role');
create policy "errors_authenticated_read" on nucleus_errors for select to authenticated using (true);
create policy "errors_authenticated_insert" on nucleus_errors for insert to authenticated with check (true);

alter table nucleus_subsystems enable row level security;
create policy "subsystems_service_full" on nucleus_subsystems for all using (auth.role() = 'service_role');
create policy "subsystems_global_read" on nucleus_subsystems for select to authenticated using (true);
create policy "subsystems_authenticated_insert" on nucleus_subsystems for insert to authenticated with check (true);

alter table nucleus_lineage enable row level security;
create policy "lineage_service_full" on nucleus_lineage for all using (auth.role() = 'service_role');
create policy "lineage_authenticated_read" on nucleus_lineage for select to authenticated using (true);
create policy "lineage_authenticated_insert" on nucleus_lineage for insert to authenticated with check (true);
create policy "lineage_authenticated_update" on nucleus_lineage for update to authenticated using (true);

-- ============================================================
-- RPC: store identity
-- ============================================================

create or replace function rpc_store_identity(identity jsonb)
returns void
language plpgsql
set search_path = public
as $$
begin
  insert into nucleus_identity (
    id,
    tenant_id,
    project_id,
    environment,
    actor,
    timestamp
  )
  values (
    (identity->>'id')::uuid,
    identity->>'tenant_id',
    identity->>'project_id',
    identity->>'environment',
    identity->'actor',
    now()
  );
end;
$$;

-- ============================================================
-- RPC: log event
-- ============================================================

create or replace function rpc_log_event(event jsonb)
returns void
language plpgsql
set search_path = public
as $$
begin
  insert into nucleus_events (
    id,
    source,
    type,
    context,
    payload,
    timestamp
  )
  values (
    (event->>'id')::uuid,
    event->>'source',
    event->>'type',
    event->'context',
    event->'payload',
    now()
  );
end;
$$;

-- ============================================================
-- RPC: log telemetry
-- ============================================================

create or replace function rpc_log_telemetry(log jsonb)
returns void
language plpgsql
set search_path = public
as $$
begin
  insert into nucleus_telemetry (
    id,
    subsystem,
    level,
    message,
    metadata,
    timestamp
  )
  values (
    (log->>'id')::uuid,
    log->>'subsystem',
    log->>'level',
    log->>'message',
    log->'metadata',
    now()
  );
end;
$$;

-- ============================================================
-- RPC: log error
-- ============================================================

create or replace function rpc_log_error(err jsonb)
returns void
language plpgsql
set search_path = public
as $$
begin
  insert into nucleus_errors (
    id,
    subsystem,
    code,
    message,
    context,
    timestamp
  )
  values (
    (err->>'id')::uuid,
    err->>'subsystem',
    err->>'code',
    err->>'message',
    err->'context',
    now()
  );
end;
$$;

-- ============================================================
-- RPC: register subsystem
-- ============================================================

create or replace function rpc_register_subsystem(reg jsonb)
returns void
language plpgsql
set search_path = public
as $$
begin
  insert into nucleus_subsystems (
    id,
    runtime,
    definition,
    health,
    telemetry,
    events,
    contracts,
    timestamp
  )
  values (
    reg->>'id',
    (reg->>'runtime')::boolean,
    (reg->>'definition')::boolean,
    (reg->>'health')::boolean,
    (reg->>'telemetry')::boolean,
    (reg->>'events')::boolean,
    (reg->>'contracts')::boolean,
    now()
  );
end;
$$;

-- ============================================================
-- GLUE WORKFLOW RUNTIME TABLES (camelCase columns as used by the app)
-- ============================================================

create table if not exists public.workflow_instances (
  id uuid primary key,
  "workflowId" uuid,
  "version" int,
  "organizationId" uuid,
  "projectId" uuid,
  "environmentId" uuid,
  status text not null default 'running',
  "currentStepId" text,
  "createdAt" timestamptz default now(),
  "startedAt" timestamptz,
  "updatedAt" timestamptz default now(),
  "completedAt" timestamptz,
  metadata jsonb
);

create index if not exists idx_wf_instances_workflow on public.workflow_instances ("workflowId");
create index if not exists idx_wf_instances_org on public.workflow_instances ("organizationId");

GRANT SELECT, INSERT, UPDATE ON public.workflow_instances TO authenticated;
GRANT ALL ON public.workflow_instances TO service_role;
ALTER TABLE public.workflow_instances ENABLE ROW LEVEL SECURITY;
create policy "wf_instances_auth_read" on public.workflow_instances for select to authenticated using (true);
create policy "wf_instances_auth_insert" on public.workflow_instances for insert to authenticated with check (true);
create policy "wf_instances_auth_update" on public.workflow_instances for update to authenticated using (true);

create table if not exists public.workflow_step_states (
  id uuid primary key,
  "instanceId" uuid references public.workflow_instances(id) on delete cascade,
  "stepId" text not null,
  status text not null default 'pending',
  "startedAt" timestamptz,
  "completedAt" timestamptz,
  output jsonb,
  metadata jsonb
);

create index if not exists idx_wf_step_states_instance on public.workflow_step_states ("instanceId");

GRANT SELECT, INSERT, UPDATE ON public.workflow_step_states TO authenticated;
GRANT ALL ON public.workflow_step_states TO service_role;
ALTER TABLE public.workflow_step_states ENABLE ROW LEVEL SECURITY;
create policy "wf_step_states_auth_read" on public.workflow_step_states for select to authenticated using (true);
create policy "wf_step_states_auth_insert" on public.workflow_step_states for insert to authenticated with check (true);
create policy "wf_step_states_auth_update" on public.workflow_step_states for update to authenticated using (true);

create table if not exists public.workflow_definitions (
  id uuid primary key,
  name text,
  version int,
  description text,
  definition jsonb,
  steps jsonb,
  created_at timestamptz default now()
);

GRANT SELECT, INSERT, UPDATE ON public.workflow_definitions TO authenticated;
GRANT ALL ON public.workflow_definitions TO service_role;
ALTER TABLE public.workflow_definitions ENABLE ROW LEVEL SECURITY;
create policy "wf_definitions_auth_read" on public.workflow_definitions for select to authenticated using (true);
create policy "wf_definitions_auth_insert" on public.workflow_definitions for insert to authenticated with check (true);
create policy "wf_definitions_auth_update" on public.workflow_definitions for update to authenticated using (true);
