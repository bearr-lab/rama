create table if not exists stripe_customers (
  agent_id uuid primary key, -- references auth.users in a real app
  stripe_customer_id text not null unique,
  created_at timestamptz default now()
);

create table if not exists agency_subscriptions (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references stripe_customers(agent_id),
  stripe_subscription_id text not null unique,
  status text not null, -- 'active', 'canceled', 'past_due', etc.
  price_id text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table stripe_customers enable row level security;
alter table agency_subscriptions enable row level security;

-- Policies (In a real app, only service roles or the owning agent can view/edit)
create policy "Allow public insert for customers" on stripe_customers for insert with check (true);
create policy "Allow public select for customers" on stripe_customers for select using (true);
create policy "Allow public update for customers" on stripe_customers for update using (true);

create policy "Allow public insert for subs" on agency_subscriptions for insert with check (true);
create policy "Allow public select for subs" on agency_subscriptions for select using (true);
create policy "Allow public update for subs" on agency_subscriptions for update using (true);
