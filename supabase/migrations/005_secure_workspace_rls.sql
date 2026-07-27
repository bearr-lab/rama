-- RAMA workspace data must be visible and mutable only by its owner.
-- This replaces the evaluation-mode policies introduced in 004.

DROP POLICY IF EXISTS "Anyone can view user shortlists" ON public.user_shortlists;
DROP POLICY IF EXISTS "Anyone can insert user shortlists" ON public.user_shortlists;
DROP POLICY IF EXISTS "Anyone can delete user shortlists" ON public.user_shortlists;
CREATE POLICY "Users can view their own saved properties" ON public.user_shortlists FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can save their own properties" ON public.user_shortlists FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can remove their own saved properties" ON public.user_shortlists FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Anyone can view kanban tasks" ON public.kanban_tasks;
DROP POLICY IF EXISTS "Anyone can insert kanban tasks" ON public.kanban_tasks;
DROP POLICY IF EXISTS "Anyone can update kanban tasks" ON public.kanban_tasks;
DROP POLICY IF EXISTS "Anyone can delete kanban tasks" ON public.kanban_tasks;
CREATE POLICY "Users can view their own tasks" ON public.kanban_tasks FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can create their own tasks" ON public.kanban_tasks FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can update their own tasks" ON public.kanban_tasks FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can delete their own tasks" ON public.kanban_tasks FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Anyone can view portfolio assets" ON public.portfolio_assets;
DROP POLICY IF EXISTS "Anyone can insert portfolio assets" ON public.portfolio_assets;
DROP POLICY IF EXISTS "Anyone can update portfolio assets" ON public.portfolio_assets;
DROP POLICY IF EXISTS "Anyone can delete portfolio assets" ON public.portfolio_assets;
CREATE POLICY "Users can view their own portfolio assets" ON public.portfolio_assets FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can create their own portfolio assets" ON public.portfolio_assets FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can update their own portfolio assets" ON public.portfolio_assets FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can delete their own portfolio assets" ON public.portfolio_assets FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Anyone can view maintenance tickets" ON public.maintenance_tickets;
DROP POLICY IF EXISTS "Anyone can insert maintenance tickets" ON public.maintenance_tickets;
DROP POLICY IF EXISTS "Anyone can update maintenance tickets" ON public.maintenance_tickets;
DROP POLICY IF EXISTS "Anyone can delete maintenance tickets" ON public.maintenance_tickets;
CREATE POLICY "Users can view their own maintenance tickets" ON public.maintenance_tickets FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can create their own maintenance tickets" ON public.maintenance_tickets FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can update their own maintenance tickets" ON public.maintenance_tickets FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can delete their own maintenance tickets" ON public.maintenance_tickets FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING ((select auth.uid()) = id) WITH CHECK ((select auth.uid()) = id);
