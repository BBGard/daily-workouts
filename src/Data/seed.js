/**
 * Database seeding file designed to populate an empty database
 * Call seedSpaubaseDatabase from the cmd line to run
 */

const { createClient } = require('@supabase/supabase-js');
const { workouts } = require('./rawWorkoutData');
const { env } = require('process');

const supabaseUrl = 'https://bvttwoglfprfoynqkqqb.supabase.co'; // Supabase URL

// Supabase Key - anon public key (safe in browsers as long as you have RLS enabled)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dHR3b2dsZnByZm95bnFrcXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNzYwNDEsImV4cCI6MjAyODY1MjA0MX0.dT1L-B_hejEIfDWbk9pE1uiFcXMk-hub3A3NBHFRdSE'

const supabase = createClient(supabaseUrl, supabaseKey); // Create a Supabase client



const seedSupabaseDatabase = async () => {
  console.log('Seeding...');

  // Map each workout to an object but only using name, category, group, link, thumbnail, duration
  const formattedWorkouts = workouts.map(workout => ({
    name: workout.name,
    category: workout.category,
    group: workout.group,
    link: workout.link,
    thumbnail: workout.thumbnail,
    duration: workout.duration,
  }));

  // console.log("Formatted workouts: ", formattedWorkouts)

  // const { data, error } = await supabase.from("workouts").insert(workouts);
  // if (error) {
  //   console.error(error);
  // } else {
  //   console.log("seeded database with workouts");
  // }

  // Test add one workout to bd
  const { data, error } = await supabase.from('workouts').insert(formattedWorkouts[0]);

  if(error) {
    console.error(error);
  } else {
    console.log('Database successfully seeded!');
  }
}

// console.log("hello");
// seedSupabaseDatabase();

async function main() {
  console.log('Inside main');
  seedSupabaseDatabase();
  console.log('Done...');
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
