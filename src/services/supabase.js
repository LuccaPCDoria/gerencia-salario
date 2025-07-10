import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mjtvqvslterecxtekoyl.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdHZxdnNsdGVyZWN4dGVrb3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTI3NTAsImV4cCI6MjA2NzY2ODc1MH0.E9t5fwJ-i14J-WhnsDD2X-dXDHbpoZnGwM7hfEAV6Ss"; // substitua pela chave real
export const supabase = createClient(supabaseUrl, supabaseKey);
