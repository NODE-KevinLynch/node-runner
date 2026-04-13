const { initDb, upsertState, getState } = require("./db");

async function run() {
  console.log("--- Initializing Database ---");
  await initDb();

  console.log("--- Saving Test Lead #1873 ---");
  await upsertState({
    fubId: "1873",
    campaignId: "TEST_CAMPAIGN",
    currentStep: 1,
    status: "active",
    deliveryMode: "note",
  });

  const state = await getState("1873");
  console.log("DATABASE RESULT:", state);
}

run().catch((err) => {
  console.error("DATABASE ERROR:", err);
});
