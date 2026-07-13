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

// Ingredients that count as a fruit/veg portion for the daily 5-a-day score.
// Potatoes deliberately excluded (they don't count towards 5-a-day).
const PRODUCE_IDS = new Set([
  "FT_BANANA", "FT_APPLE", "FT_PEAR", "FT_GRAPES", "FT_STRAWBERRY",
  "FT_RASPBERRY", "FT_BLUEBERRY", "FT_WATERMELON", "FT_MANGO", "FR_BERRIES",
  "FR_PEAS", "FR_SWEETCORN", "FR_BROCCOLI", "FD_CUCUMBER", "FR_BEANS",
]);
const TARGET_PORTIONS = 5;

/* =========================================================
   MEALS
   Each meal may optionally carry:
   - protein: [...] tags used to stop the same protein appearing
     twice in one day (e.g. tuna at lunch AND dinner).
   - treatNight: true for indulgent dinners only allowed Fri/Sat/Sun.
   - fridayOnly: true to lock a dinner to Fridays specifically.
   ========================================================= */
const BREAKFASTS = [
  { name: "Yoghurt + banana", ing: ["FD_YOGHURT", "FT_BANANA"] },
  { name: "Toast + butter", ing: ["CB_BREAD", "FD_BUTTER"] },
  { name: "Toast + peanut butter", ing: ["CB_BREAD", "CB_PEANUT_BUTTER"] },
  { name: "Toast + Nutella", ing: ["CB_BREAD", "CB_NUTELLA"] },
  { name: "Cereal + milk", ing: ["CB_CEREAL", "FD_MILK"] },
  { name: "Porridge + banana", ing: ["CB_PORRIDGE", "FT_BANANA"] },
  { name: "Porridge + frozen berries", ing: ["CB_PORRIDGE", "FR_BERRIES"] },
  { name: "Scrambled eggs on toast", ing: ["FD_EGGS", "CB_BREAD", "FD_BUTTER"], protein: ["egg"] },
  { name: "Beans on toast", ing: ["FR_BEANS", "CB_BREAD"], protein: ["beans"] },
];

// Weekday lunches need to be easy to eat at placement — no oven, no real cooking.
const WEEKDAY_LUNCHES = [
  { name: "Ham sandwich + cucumber + fruit", ing: ["FD_HAM", "CB_BREAD", "FD_CUCUMBER", "FT_APPLE"], protein: ["ham"] },
  { name: "Chicken wrap + cucumber", ing: ["FD_CHICKEN_SLICES", "CB_WRAPS", "FD_CUCUMBER"], protein: ["chicken"] },
  { name: "Ham & cucumber plate + fruit", ing: ["FD_HAM", "FD_CUCUMBER", "FT_GRAPES"], protein: ["ham"] },
  { name: "Cold tuna pasta", ing: ["CB_TUNA", "CB_PASTA"], protein: ["tuna"] },
];

// Weekends can stretch to something that needs the microwave/oven properly.
const WEEKEND_LUNCHES = [
  ...WEEKDAY_LUNCHES,
  { name: "Jacket potato + beans", ing: ["CB_POTATO", "FR_BEANS"], protein: ["beans"] },
];

const DINNERS = [
  { name: "Chicken + rice + peas", ing: ["FR_CHICKEN_BREAST", "CB_RICE", "FR_PEAS"], protein: ["chicken"],
    leftoverLunch: { name: "Leftover chicken + rice", ing: ["FR_CHICKEN_BREAST", "CB_RICE"], protein: ["chicken"] } },
  { name: "Chicken + pasta + sweetcorn", ing: ["FR_CHICKEN_BREAST", "CB_PASTA", "FR_SWEETCORN"], protein: ["chicken"],
    leftoverLunch: { name: "Leftover chicken + pasta", ing: ["FR_CHICKEN_BREAST", "CB_PASTA"], protein: ["chicken"] } },
  { name: "Chicken + mashed potato + beans", ing: ["FR_CHICKEN_BREAST", "CB_POTATO", "FR_BEANS"], protein: ["chicken"],
    leftoverLunch: { name: "Leftover chicken + potato", ing: ["FR_CHICKEN_BREAST", "CB_POTATO"], protein: ["chicken"] } },
  { name: "Fish fingers + wedges + peas", ing: ["FR_FISH_FINGERS", "FR_CHIPS", "FR_PEAS"], protein: ["fish"] },
  { name: "Fish fingers + wedges + broccoli", ing: ["FR_FISH_FINGERS", "FR_CHIPS", "FR_BROCCOLI"], protein: ["fish"] },
  { name: "Tuna pasta + sweetcorn", ing: ["CB_TUNA", "CB_PASTA", "FR_SWEETCORN"], protein: ["tuna"] },
  { name: "Tuna jacket potato + beans", ing: ["CB_TUNA", "CB_POTATO", "FR_BEANS"], protein: ["tuna"] },
  { name: "Egg fried rice", ing: ["FD_EGGS", "CB_RICE", "FR_PEAS", "FR_SWEETCORN"], protein: ["egg"] },
  { name: "Noodles + egg + broccoli", ing: ["CB_NOODLES", "FD_EGGS", "FR_BROCCOLI"], protein: ["egg"] },
  { name: "Beef mince + pasta + garlic bread", ing: ["FD_MINCE", "CB_PASTA", "CB_KETCHUP", "FR_GARLIC_BREAD"], protein: ["beef"],
    leftoverLunch: { name: "Leftover mince pasta", ing: ["FD_MINCE", "CB_PASTA"], protein: ["beef"] } },
  { name: "Beef mince + rice + peas", ing: ["FD_MINCE", "CB_RICE", "FR_PEAS"], protein: ["beef"],
    leftoverLunch: { name: "Leftover mince + rice", ing: ["FD_MINCE", "CB_RICE"], protein: ["beef"] } },
  { name: "Bacon + eggs + toast", ing: ["FD_BACON", "FD_EGGS", "CB_BREAD"], protein: ["bacon", "egg"] },
  { name: "Bacon + beans + toast", ing: ["FD_BACON", "FR_BEANS", "CB_BREAD"], protein: ["bacon"] },
  { name: "Plain omelette + toast", ing: ["FD_EGGS", "CB_BREAD", "FD_BUTTER"], protein: ["egg"] },
  { name: "Beans + toast", ing: ["FR_BEANS", "CB_BREAD"], protein: ["beans"] },
  { name: "Cottage pie (batch-cooked)", ing: ["FD_MINCE", "CB_POTATO", "CB_GRAVY"], protein: ["beef"], treatNight: true,
    leftoverLunch: { name: "Leftover cottage pie", ing: ["FD_MINCE", "CB_POTATO"], protein: ["beef"] } },
  { name: "Pizza + cucumber + garlic bread", ing: ["FR_PIZZA", "FD_CUCUMBER", "FR_GARLIC_BREAD"], protein: ["pizza"], treatNight: true, fridayOnly: true,
    leftoverLunch: { name: "Leftover pizza slices", ing: ["FR_PIZZA"], protein: ["pizza"] } },
];

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_IN_ROTATION = 30;

/* =========================================================
   STATE
   ========================================================= */
let currentPlan = []; // array of { breakfast, lunch, dinner, dayOfWeek }

/* =========================================================
   SCORING HELPERS
   ========================================================= */
function producePortions(meal) {
  return meal.ing.reduce((count, id) => count + (PRODUCE_IDS.has(id) ? 1 : 0), 0);
}

function proteinTags(meal) {
  return meal.protein || [];
}

// True if the two meals share a protein tag (e.g. both "tuna") — the
// same-thing-twice-in-a-day case we want to avoid.
function proteinsClash(a, b) {
  const ta = proteinTags(a);
  const tb = proteinTags(b);
  if (ta.length === 0 || tb.length === 0) return false;
  return ta.some(t => tb.includes(t));
}

/* =========================================================
   GENERATION LOGIC
   ========================================================= */
const FRIDAY_DINNER = DINNERS.find(m => m.fridayOnly);

// Builds one day's breakfast/lunch/dinner together, rather than picking
// each meal in isolation, so we can:
//  - guarantee no two meals in the same day share a protein tag
//  - pick the combination whose total fruit/veg portions lands as
//    close to 5 as the day's constraints allow
//  - force pizza on Fridays, and only Fridays
function buildDay(dayOfWeek, prevBreakfastName, prevLunchName, prevDinner, recentDinnerNames) {
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Sat/Sun
  const isFriday = dayOfWeek === 4;
  const isTreatNight = dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6; // Fri/Sat/Sun

  // Breakfast candidates — just avoid repeating yesterday's when possible.
  let breakfastPool = BREAKFASTS;
  if (breakfastPool.length > 1 && prevBreakfastName) {
    const alt = breakfastPool.filter(m => m.name !== prevBreakfastName);
    if (alt.length > 0) breakfastPool = alt;
  }

  // Lunch candidates — forced to yesterday's leftovers if the previous
  // dinner was a batch-cooked one; otherwise pick from the day-appropriate pool.
  const forcedLunch = prevDinner && prevDinner.leftoverLunch ? prevDinner.leftoverLunch : null;
  let lunchPool = forcedLunch ? [forcedLunch] : (isWeekend ? WEEKEND_LUNCHES : WEEKDAY_LUNCHES);
  if (!forcedLunch && lunchPool.length > 1 && prevLunchName) {
    const alt = lunchPool.filter(m => m.name !== prevLunchName);
    if (alt.length > 0) lunchPool = alt;
  }

  // Dinner candidates — Friday is always pizza; other days rotate through
  // everything except pizza (reserved for Fridays) and recently-used dinners.
  let dinnerPool;
  if (isFriday) {
    dinnerPool = [FRIDAY_DINNER];
  } else {
    dinnerPool = DINNERS.filter(m => !m.fridayOnly);
    const notRecent = dinnerPool.filter(m => !recentDinnerNames.includes(m.name));
    if (notRecent.length > 0) dinnerPool = notRecent;
    if (!isTreatNight) {
      const noTreat = dinnerPool.filter(m => !m.treatNight);
      if (noTreat.length > 0) dinnerPool = noTreat;
    }
  }

  // Enumerate every valid breakfast/lunch/dinner combo (pools are small,
  // so this is cheap), reject combos with a same-day protein clash, and
  // keep the combo(s) closest to the 5-a-day portion target.
  let bestScore = Infinity;
  let bestCombos = [];

  for (const b of breakfastPool) {
    for (const l of lunchPool) {
      if (proteinsClash(b, l)) continue;
      for (const d of dinnerPool) {
        if (proteinsClash(b, d) || proteinsClash(l, d)) continue;
        const portions = producePortions(b) + producePortions(l) + producePortions(d);
        const score = Math.abs(TARGET_PORTIONS - portions);
        if (score < bestScore) {
          bestScore = score;
          bestCombos = [{ b, l, d }];
        } else if (score === bestScore) {
          bestCombos.push({ b, l, d });
        }
      }
    }
  }

  // Fallback (shouldn't normally trigger): if every combo clashed on
  // protein, ignore that constraint rather than leaving the day empty.
  if (bestCombos.length === 0) {
    for (const b of breakfastPool) {
      for (const l of lunchPool) {
        for (const d of dinnerPool) {
          const portions = producePortions(b) + producePortions(l) + producePortions(d);
          const score = Math.abs(TARGET_PORTIONS - portions);
          if (score < bestScore) {
            bestScore = score;
            bestCombos = [{ b, l, d }];
          } else if (score === bestScore) {
            bestCombos.push({ b, l, d });
          }
        }
      }
    }
  }

  const pick = bestCombos[Math.floor(Math.random() * bestCombos.length)];
  return { breakfast: pick.b, lunch: pick.l, dinner: pick.d, dayOfWeek };
}

function generatePlan() {
  const plan = [];
  let lastBreakfastName = null;
  let lastLunchName = null;
  const recentDinnerNames = [];
  let prevDinner = null;

  for (let i = 0; i < DAYS_IN_ROTATION; i++) {
    const dayOfWeek = i % 7; // 0 = Mon ... 6 = Sun
    const day = buildDay(dayOfWeek, lastBreakfastName, lastLunchName, prevDinner, recentDinnerNames);
    plan.push(day);

    lastBreakfastName = day.breakfast.name;
    lastLunchName = day.lunch.name;
    recentDinnerNames.push(day.dinner.name);
    if (recentDinnerNames.length > 4) recentDinnerNames.shift();
    prevDinner = day.dinner;
  }
  return plan;
}

// Rerolling a single day also has to keep the day after it honest: if that
// day's lunch was leftovers from the old dinner, it needs recalculating
// once the dinner changes — so we rebuild the following day too.
function regenerateDay(index) {
  const dayOfWeek = index % 7;
  const prevDay = currentPlan[index - 1];
  const nextDay = currentPlan[index + 1];

  const nearbyDinnerNames = [prevDay?.dinner?.name, nextDay?.dinner?.name].filter(Boolean);
  const newDay = buildDay(
    dayOfWeek,
    prevDay ? prevDay.breakfast.name : null,
    prevDay ? prevDay.lunch.name : null,
    prevDay ? prevDay.dinner : null,
    nearbyDinnerNames
  );
  currentPlan[index] = newDay;

  if (nextDay) {
    const nextDayOfWeek = (index + 1) % 7;
    const nextNearbyDinnerNames = [newDay.dinner.name, currentPlan[index + 2]?.dinner?.name].filter(Boolean);
    currentPlan[index + 1] = buildDay(
      nextDayOfWeek,
      newDay.breakfast.name,
      newDay.lunch.name,
      newDay.dinner,
      nextNearbyDinnerNames
    );
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
