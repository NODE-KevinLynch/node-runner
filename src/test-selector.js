const { getCampaign } = require("./selector");

const testPeople = [
  {
    id: 1873,
    firstName: "Kevin",
    tags: ["AI-Assessment-Complete", "Lead Gen Issue", "Urgency: High"],
    custom_fields: {
      production_band: "0-10",
    },
  },
  {
    id: 2001,
    firstName: "Sarah",
    tags: ["No Assessment"],
    custom_fields: {},
  },
  {
    id: 2002,
    firstName: "Mike",
    tags: ["AI-Assessment-Complete", "CRM Broken"],
    custom_fields: {},
  },
];

for (const person of testPeople) {
  const result = getCampaign(person);

  console.log("----");
  console.log("Name:", person.firstName);
  console.log("Eligible:", result.eligible);
  console.log("Campaign:", result.campaignId);
  console.log("Offer Type:", result.profile.offerType);
  console.log("Bottleneck:", result.profile.primaryBottleneck);
}