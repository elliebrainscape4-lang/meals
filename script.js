/* =========================================================
   INGREDIENTS
   Each ingredient belongs to a shopping-list category.
   ========================================================= */
const INGREDIENTS = {
  // Freezer
  FR_CHICKEN_BREAST: { name: "Chicken breast", cat: "freezer" },
  FR_GOUJONS:        { name: "Frozen chicken goujons", cat: "freezer" },
  FR_FISH_FINGERS:   { name: "Frozen fish fingers", cat: "freezer" },
  FR_CHIPS:          { name: "Oven chips / wedges", cat: "freezer" },
  FR_PEAS:           { name: "Frozen peas", cat: "freezer" },
  FR_SWEETCORN:      { name: "Frozen sweetcorn", cat: "freezer" },
  FR_BEANS:          { name: "Baked beans", cat: "freezer" },
  FR_BROCCOLI:       { name: "Frozen broccoli", cat: "freezer" },
  FR_BERRIES:        { name: "Frozen berries", cat: "freezer" },
  FR_GARLIC_BREAD:   { name: "Garlic bread", cat: "freezer" },
  FR_PIZZA:          { name: "Pizza", cat: "freezer" },

  // Cupboard
  CB_RICE:           { name: "Rice", cat: "cupboard" },
  CB_PASTA:          { name: "Pasta", cat: "cupboard" },
  CB_NOODLES:        { name: "Noodles", cat: "cupboard" },
  CB_PORRIDGE:       { name: "Porridge oats", cat: "cupboard" },
  CB_CEREAL:         { name: "Jordans Country Crisp cereal", cat: "cupboard" },
  CB_BREAD:          { name: "Bread", cat: "cupboard" },
  CB_WRAPS:          { name: "Wraps", cat: "cupboard" },
  CB_TOM_SAUCE:      { name: "Tomato pasta sauce", cat: "cupboard" },
  CB_TUNA:           { name: "Tuna (tinned)", cat: "cupboard" },
  CB_KETCHUP:        { name: "Ketchup", cat: "cupboard" },
  CB_GRAVY:          { name: "Gravy granules", cat: "cupboard" },
  CB_PEANUT_BUTTER:  { name: "Peanut butter", cat: "cupboard" },
  CB_NUTELLA:        { name: "Nutella", cat: "cupboard" },
  CB_POTATO:         { name: "Potatoes", cat: "cupboard" },

  // Fridge
  FD_HAM:            { name: "Ham slices", cat: "fridge" },
  FD_CHICKEN_SLICES: { name: "Chicken slices", cat: "fridge" },
  FD_BACON:          { name: "Bacon", cat: "fridge" },
  FD_MINCE:          { name: "Beef mince", cat: "fridge" },
  FD_EGGS:           { name: "Eggs", cat: "fridge" },
  FD_YOGHURT:        { name: "Yoghurts (Müller Corner)", cat: "fridge" },
  FD_MILK:           { name: "Milk", cat: "fridge" },
  FD_BUTTER:         { name: "Butter / margarine", cat: "fridge" },
  FD_CUCUMBER:       { name: "Cucumber", cat: "fridge" },

  // Fruit
  FT_BANANA:         { name: "Bananas", cat: "fruit" },
  FT_APPLE:          { name: "Apples", cat: "fruit" },
  FT_PEAR:           { name: "Pears", cat: "fruit" },
  FT_GRAPES:         { name: "Grapes", cat: "fruit" },
  FT_STRAWBERRY:     { name: "Strawberries", cat: "fruit" },
  FT_RASPBERRY:      { name: "Raspberries", cat: "fruit" },
  FT_BLUEBERRY:      { name: "Blueberries", cat: "fruit" },
  FT_WATERMELON:     { name: "Watermelon (occasional)", cat: "fruit" },
  FT_MANGO:          { name: "Mango (occasional)", cat: "fruit" },
};

// Fruit is bought as a standing weekly staple regardless of which meals
// happen to reference it, so the full confirmed list always appears.
const FRUIT_FULL_LIST = [
  "Bananas", "Apples", "Pears", "Grapes",
  "Strawberries", "Raspberries", "Blueberries",
  "Watermelon (occasional)", "Mango (occasional)",
];

const CATEGORY_ORDER = ["freezer", "cupboard", "fridge", "fruit", "basics", "extras"];
const CATEGORY_LABELS = {
  freezer: "Freezer",
  cupboard: "Cupboard",
  fridge: "Fridge",
  fruit: "Fruit",
  basics: "Kitchen basics",
  extras: "Snacks, drinks & treats",
};

// Always-there kitchen basics — not tied to any one meal
const KITCHEN_BASICS = ["Salt", "Spray veg oil"];

// Fixed snacks / drinks / treats list — not randomly generated, just included as a set
const EXTRAS = [
  "Cereal bars", "Protein bars", "Crisps", "Fruit bags / fruit snacks", "Popcorn",
  "Water (for placement)", "Squash", "Juice", "Diet Coke", "Peach iced tea",
  "Hot chocolate (occasional)", "Chocolate — buy portioned", "Biscuits",
];

/* =========================================================
   MEALS
   ========================================================= */
const BREAKFASTS = [
  { name: "Yoghurt + banana", ing: ["FD_YOGHURT", "FT_BANANA"] },
  { name: "Toast + butter", ing: ["CB_BREAD", "FD_BUTTER"] },
  { name: "Toast + peanut butter", ing: ["CB_BREAD", "CB_PEANUT_BUTTER"] },
  { name: "Toast + Nutella", ing: ["CB_BREAD", "CB_NUTELLA"] },
  { name: "Cereal + milk", ing: ["CB_CEREAL", "FD_MILK"] },
  { name: "Porridge + banana", ing: ["CB_PORRIDGE", "FT_BANANA"] },
  { name: "Porridge + frozen berries", ing: ["CB_PORRIDGE", "FR_BERRIES"] },
  { name: "Scrambled eggs on toast", ing: ["FD_EGGS", "CB_BREAD", "FD_BUTTER"] },
  { name: "Beans on toast", ing: ["FR_BEANS", "CB_BREAD"] },
];

// Weekday lunches need to be easy to eat at placement — no oven, no real cooking.
const WEEKDAY_LUNCHES = [
  { name: "Ham sandwich + cucumber + fruit", ing: ["FD_HAM", "CB_BREAD", "FD_CUCUMBER", "FT_APPLE"] },
  { name: "Chicken wrap + cucumber", ing: ["FD_CHICKEN_SLICES", "CB_WRAPS", "FD_CUCUMBER"] },
  { name: "Ham & cucumber plate + fruit", ing: ["FD_HAM", "FD_CUCUMBER", "FT_GRAPES"] },
  { name: "Cold tuna pasta", ing: ["CB_TUNA", "CB_PASTA"] },
];

// Weekends can stretch to something that needs the microwave/oven properly.
const WEEKEND_LUNCHES = [
  ...WEEKDAY_LUNCHES,
  { name: "Jacket potato + beans", ing: ["CB_POTATO", "FR_BEANS"] },
];

const DINNERS = [
  { name: "Chicken + rice + peas", ing: ["FR_CHICKEN_BREAST", "CB_RICE", "FR_PEAS"],
    leftoverLunch: { name: "Leftover chicken + rice", ing: ["FR_CHICKEN_BREAST", "CB_RICE"] } },
  { name: "Chicken + pasta + sweetcorn", ing: ["FR_CHICKEN_BREAST", "CB_PASTA", "FR_SWEETCORN"],
    leftoverLunch: { name: "Leftover chicken + pasta", ing: ["FR_CHICKEN_BREAST", "CB_PASTA"] } },
  { name: "Chicken + mashed potato + beans", ing: ["FR_CHICKEN_BREAST", "CB_POTATO", "FR_BEANS"],
    leftoverLunch: { name: "Leftover chicken + potato", ing: ["FR_CHICKEN_BREAST", "CB_POTATO"] } },
  { name: "Fish fingers + wedges + peas", ing: ["FR_FISH_FINGERS", "FR_CHIPS", "FR_PEAS"] },
  { name: "Fish fingers + wedges + broccoli", ing: ["FR_FISH_FINGERS", "FR_CHIPS", "FR_BROCCOLI"] },
  { name: "Tuna pasta + sweetcorn", ing: ["CB_TUNA", "CB_PASTA", "FR_SWEETCORN"] },
  { name: "Tuna jacket potato + beans", ing: ["CB_TUNA", "CB_POTATO", "FR_BEANS"] },
  { name: "Egg fried rice", ing: ["FD_EGGS", "CB_RICE", "FR_PEAS", "FR_SWEETCORN"] },
  { name: "Noodles + egg + broccoli", ing: ["CB_NOODLES", "FD_EGGS", "FR_BROCCOLI"] },
  { name: "Beef mince + pasta + garlic bread", ing: ["FD_MINCE", "CB_PASTA", "CB_KETCHUP", "FR_GARLIC_BREAD"],
    leftoverLunch: { name: "Leftover mince pasta", ing: ["FD_MINCE", "CB_PASTA"] } },
  { name: "Beef mince + rice + peas", ing: ["FD_MINCE", "CB_RICE", "FR_PEAS"],
    leftoverLunch: { name: "Leftover mince + rice", ing: ["FD_MINCE", "CB_RICE"] } },
  { name: "Bacon + eggs + toast", ing: ["FD_BACON", "FD_EGGS", "CB_BREAD"] },
  { name: "Bacon + beans + toast", ing: ["FD_BACON", "FR_BEANS", "CB_BREAD"] },
  { name: "Plain omelette + toast", ing: ["FD_EGGS", "CB_BREAD", "FD_BUTTER"] },
  { name: "Beans + toast", ing: ["FR_BEANS", "CB_BREAD"] },
  { name: "Cottage pie (batch-cooked)", ing: ["FD_MINCE", "CB_POTATO", "CB_GRAVY"], treatNight: true,
    leftoverLunch: { name: "Leftover cottage pie", ing: ["FD_MINCE", "CB_POTATO"] } },
  { name: "Pizza + cucumber + garlic bread", ing: ["FR_PIZZA", "FD_CUCUMBER", "FR_GARLIC_BREAD"], treatNight: true,
    leftoverLunch: { name: "Leftover pizza slices", ing: ["FR_PIZZA"] } },
];

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_IN_ROTATION = 30;

/* =========================================================
   STATE
   ========================================================= */
let currentPlan = []; // array of { breakfast, lunch, dinner }

/* =========================================================
   GENERATION LOGIC
   ========================================================= */
function pickMeal(pool, lastName, avoidTreatNight) {
  let options = pool;
  if (avoidTreatNight) {
    options = pool.filter(m => !m.treatNight);
  }
  if (options.length > 1 && lastName) {
    const withoutLast = options.filter(m => m.name !== lastName);
    if (withoutLast.length > 0) options = withoutLast;
  }
  return options[Math.floor(Math.random() * options.length)];
}

// Decide the lunch for a given day, given the previous day's dinner (if any)
// and whether today is a weekday or weekend (weekday lunches must be
// grab-and-go for placement; weekends can stretch to a jacket potato etc).
// If the previous dinner was cooked in a batch (chicken, mince, cottage pie,
// pizza...), the next day's lunch is that leftover — not a random pick —
// so the plan never suggests "leftover X" without an X having been cooked.
function pickLunchForDay(prevDinner, lastLunchName, dayOfWeek) {
  if (prevDinner && prevDinner.leftoverLunch) {
    return prevDinner.leftoverLunch;
  }
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Sat/Sun
  const pool = isWeekend ? WEEKEND_LUNCHES : WEEKDAY_LUNCHES;
  return pickMeal(pool, lastLunchName, false);
}

function generatePlan() {
  const plan = [];
  let lastBreakfast = null;
  let lastLunchName = null;
  const recentDinners = [];
  let prevDinner = null;

  for (let i = 0; i < DAYS_IN_ROTATION; i++) {
    const dayOfWeek = i % 7; // 0 = Mon ... 6 = Sun
    const isTreatNight = dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6; // Fri/Sat/Sun

    const breakfast = pickMeal(BREAKFASTS, lastBreakfast, false);
    const lunch = pickLunchForDay(prevDinner, lastLunchName, dayOfWeek);

    let dinnerPool = DINNERS.filter(m => !recentDinners.includes(m.name));
    if (dinnerPool.length === 0) dinnerPool = DINNERS;
    const dinner = pickMeal(dinnerPool, null, !isTreatNight);

    plan.push({ breakfast, lunch, dinner, dayOfWeek });

    lastBreakfast = breakfast.name;
    lastLunchName = lunch.name;
    recentDinners.push(dinner.name);
    if (recentDinners.length > 4) recentDinners.shift();
    prevDinner = dinner;
  }
  return plan;
}

// Rerolling a single day also has to keep the day after it honest: if that
// day's lunch was "leftover"-something from the old dinner, it needs
// updating once the dinner changes.
function regenerateDay(index) {
  const dayOfWeek = index % 7;
  const isTreatNight = dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6;
  const prevDay = currentPlan[index - 1];
  const nextDay = currentPlan[index + 1];

  const breakfast = pickMeal(BREAKFASTS, prevDay ? prevDay.breakfast.name : null, false);
  const lunch = pickLunchForDay(prevDay ? prevDay.dinner : null, prevDay ? prevDay.lunch.name : null, dayOfWeek);

  const nearbyDinners = [prevDay?.dinner?.name, nextDay?.dinner?.name].filter(Boolean);
  let dinnerPool = DINNERS.filter(m => !nearbyDinners.includes(m.name));
  if (dinnerPool.length === 0) dinnerPool = DINNERS;
  const dinner = pickMeal(dinnerPool, null, !isTreatNight);

  currentPlan[index] = { breakfast, lunch, dinner, dayOfWeek };

  // Keep the next day's lunch consistent with this day's (possibly new) dinner.
  if (nextDay) {
    const nextDayOfWeek = (index + 1) % 7;
    const nextIsTreatNight = nextDayOfWeek === 4 || nextDayOfWeek === 5 || nextDayOfWeek === 6;
    const nextLunch = pickLunchForDay(dinner, null, nextDayOfWeek);
    const nearbyNextDinners = [dinner.name, currentPlan[index + 2]?.dinner?.name].filter(Boolean);
    let nextDinnerPool = DINNERS.filter(m => !nearbyNextDinners.includes(m.name));
    if (nextDinnerPool.length === 0) nextDinnerPool = DINNERS;
    const nextDinner = nearbyNextDinners.includes(nextDay.dinner.name)
      ? pickMeal(nextDinnerPool, null, !nextIsTreatNight)
      : nextDay.dinner;
    currentPlan[index + 1] = { ...nextDay, lunch: nextLunch, dinner: nextDinner };
  }
}

/* =========================================================
   SHOPPING LIST BUILD
   ========================================================= */
function buildShoppingList(plan, includeExtras, includeBasics) {
  const used = new Set();
  plan.forEach(day => {
    [...day.breakfast.ing, ...day.lunch.ing, ...day.dinner.ing].forEach(id => used.add(id));
  });

  const grouped = {};
  CATEGORY_ORDER.forEach(cat => { grouped[cat] = []; });

  used.forEach(id => {
    const item = INGREDIENTS[id];
    if (item && item.cat !== "fruit") grouped[item.cat].push(item.name);
  });

  Object.keys(grouped).forEach(cat => grouped[cat].sort((a, b) => a.localeCompare(b)));

  // Fruit is always the full standing list, independent of which meals were rolled.
  grouped.fruit = [...FRUIT_FULL_LIST];

  if (includeBasics) grouped.basics = [...KITCHEN_BASICS];
  if (includeExtras) grouped.extras = [...EXTRAS];

  return grouped;
}

/* =========================================================
   RENDERING
   ========================================================= */
function renderTable(plan) {
  const tbody = document.getElementById("mealTableBody");
  tbody.innerHTML = "";

  plan.forEach((day, index) => {
    const tr = document.createElement("tr");
    const isWeekend = day.dayOfWeek === 5 || day.dayOfWeek === 6;
    if (isWeekend) tr.classList.add("weekend-row");

    tr.innerHTML = `
      <td>
        <span class="day-label">Day ${index + 1}</span>
        <span class="day-sub">${WEEKDAY_LABELS[day.dayOfWeek]}</span>
      </td>
      <td>${day.breakfast.name}</td>
      <td>${day.lunch.name}</td>
      <td>${day.dinner.name}</td>
      <td><button class="reroll-btn" data-index="${index}" title="Reroll this day" aria-label="Reroll day ${index + 1}">&#8635;</button></td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".reroll-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      regenerateDay(idx);
      renderTable(currentPlan);
      renderShoppingList();
    });
  });
}

function renderShoppingList() {
  const includeExtras = document.getElementById("extrasToggle").checked;
  const includeBasics = document.getElementById("basicsToggle").checked;
  const grouped = buildShoppingList(currentPlan, includeExtras, includeBasics);

  const container = document.getElementById("shoppingList");
  container.innerHTML = "";

  let itemCounter = 0;
  CATEGORY_ORDER.forEach(cat => {
    const items = grouped[cat];
    if (!items || items.length === 0) return;

    const group = document.createElement("div");
    group.className = "shop-group";

    const title = document.createElement("p");
    title.className = "shop-group-title";
    title.textContent = CATEGORY_LABELS[cat];
    group.appendChild(title);

    items.forEach(name => {
      itemCounter++;
      const id = `item-${itemCounter}`;
      const row = document.createElement("div");
      row.className = "shop-item";
      row.innerHTML = `<input type="checkbox" id="${id}"><label for="${id}">${name}</label>`;
      group.appendChild(row);
    });

    container.appendChild(group);
  });

  document.getElementById("printBtn").disabled = currentPlan.length === 0;
}

/* =========================================================
   EVENTS
   ========================================================= */
document.getElementById("generateBtn").addEventListener("click", () => {
  currentPlan = generatePlan();
  renderTable(currentPlan);
  renderShoppingList();
});

document.getElementById("extrasToggle").addEventListener("change", () => {
  if (currentPlan.length) renderShoppingList();
});

document.getElementById("basicsToggle").addEventListener("change", () => {
  if (currentPlan.length) renderShoppingList();
});

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});
