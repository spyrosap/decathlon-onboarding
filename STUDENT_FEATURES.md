# Student Feature Ideas — Instructor Reference

This file is for the instructor. Each feature below is a candidate exercise for PM students.
The student's task is to **read the codebase**, understand the existing rules, and **write a spec**
for one of these features before asking Claude Code to implement it.

A well-written spec will account for every rule listed. A spec that misses them will produce
a broken or inconsistent feature.

---

## Feature 1 — "Edit my profile" button on the summary screen

**What it does:** After completing the flow, a user can tap "Edit" to go back and change an earlier answer.

**Rules students must discover before speccing:**

- **Cascade resets** (`src/App.jsx` — `updateData`): Changing `sports` wipes `equipment`, `fitnessLevel`,
  and `goal`. Changing `fitnessLevel` wipes `goal`. The spec must define what gets reset when the user
  edits each field.
- **Conditional equipment step** (`src/data/sports.js` — `needsEquipmentStep`): If the user edits their
  sports and removes all gear-requiring sports, the equipment step disappears from the flow — and their
  `equipment` answer becomes null. The spec must handle this case.
- **Goal eligibility** (`src/data/goals.js` — `getAvailableGoals`): After editing sports or fitness level,
  the previously selected goal may no longer be available. The spec must decide whether to auto-clear it
  or warn the user.

---

## Feature 2 — "You might also like" sport suggestion

**What it does:** On the sports step (or the summary), suggest one sport the user hasn't selected yet
that complements their current choices.

**Rules students must discover before speccing:**

- **MAX_SPORTS cap** (`src/data/sports.js` — `MAX_SPORTS = 3`): The suggestion must not appear (or must
  be greyed out) if the user is already at the 3-sport limit.
- **Category data model** (`src/data/sports.js` — `SPORTS[].category`): A meaningful suggestion should
  come from the same or a complementary category. The spec must define the matching logic.
- **Intensity scoring** (`src/data/sports.js` — `SPORTS[].intensity`): To avoid suggesting a sport that
  is way harder or easier than what the user already does, the spec should account for intensity proximity.
- **requiresGear side-effect** (`src/data/sports.js` — `needsEquipmentStep`): Suggesting a gear-heavy sport
  will insert the equipment step into the flow when the user accepts it. The spec must decide whether to
  warn the user about this.

---

## Feature 3 — Training frequency step

**What it does:** A new step (between Fitness Level and Goals) asking "How often do you train?"
with options like: Rarely / 1–2×/week / 3–4×/week / Daily.

**Rules students must discover before speccing:**

- **Dynamic step sequence** (`src/App.jsx` — `stepSequence` useMemo): The step order is computed, not
  hardcoded. A new step must be inserted into this sequence, not appended at the end.
- **Cascade reset** (`src/App.jsx` — `updateData`): The frequency answer lives downstream of `fitnessLevel`.
  Changing fitnessLevel must also clear `frequency`. The spec must add this to the reset chain.
- **New `userData` field**: The `userData` object in App.jsx must be extended. The spec should define the
  field name, its initial value (`null`), and where it appears in the profile summary.
- **Progress bar**: Adding a step changes `progressSteps.length` automatically — but the spec should
  verify this works correctly for both the with-equipment and without-equipment flows.

---

## Feature 4 — Budget preference step

**What it does:** After the Goals step, if the user selected "Find the right gear" as their goal,
show an additional step: "What's your budget?" with options Budget-friendly / Mid-range / Premium.

**Rules students must discover before speccing:**

- **Conditional flow pattern** (`src/App.jsx` — `stepSequence` useMemo): The budget step should only
  appear when `userData.goal === 'gear'`. The spec must describe how this conditional mirrors the existing
  equipment step pattern.
- **Equipment step already exists** (`src/steps/Step3_Equipment.jsx`): There's already a step capturing
  gear ownership status (`none` / `some` / `ready`). The spec must explain how budget *differs from*
  and relates to equipment status — e.g., a "Starting from scratch" user might need budget guidance more
  than a "Fully equipped" user.
- **Goal eligibility interaction** (`src/data/goals.js`): The "Find the right gear" goal is only available
  to certain fitness levels and sport counts. The spec must ensure the budget step is never orphaned when
  the goal becomes unavailable on a back-navigate.
- **Cascade reset**: Changing the goal away from 'gear' must clear `budget`. The spec must add this.

---

## Feature 5 — Profile sharing / export

**What it does:** On the final screen, a "Share my profile" button generates a shareable summary
(URL, image, or clipboard text) of the user's Decathlon profile.

**Rules students must discover before speccing:**

- **Nullable `equipment` field** (`src/App.jsx` — `userData.equipment`): Users who selected only
  non-gear sports never hit the equipment step, so `equipment` is `null` in their profile. The spec
  must handle this gracefully in the shared output (omit the field, show "N/A", etc.).
- **`getDominantCategory` edge cases** (`src/data/sports.js`): With a single sport selected, the dominant
  category is straightforward. With 2 sports from different categories at equal intensity, the tie-break
  logic applies. The spec must decide what to show when the result is ambiguous.
- **`LEVEL_LABELS` uses default copy** (`src/steps/Step4_Goals.jsx`): The profile summary always displays
  the *default* fitness level label (e.g., "Just starting out"), not the wellness variant — even if
  the user saw wellness copy during the flow. The spec must decide whether the shared profile should
  reflect what the user saw, or the canonical label.
- **No persistence**: There is no backend or localStorage — the profile only exists in React state.
  The spec must decide how sharing works without a server (e.g., encode state in the URL, use
  Web Share API, or copy to clipboard).
