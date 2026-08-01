# 🤖 AI AGENT EXECUTION RULES & BOUNDARIES

## ⚠️ PRIMARY DIRECTIVE: STRICT SCOPE ADHERENCE
You are operating under strict production rules. You must NEVER write unrequested code, assume extra features, or refactor existing code outside the explicitly assigned scope.

---

## 🚫 WHAT NOT TO DO (STRICT PROHIBITIONS)
1. **NO EXTRA WORK:** Do NOT add unrequested features, "nice-to-have" UI elements, extra API endpoints, or extra helper functions unless explicitly asked.
2. **NO ASSUMPTIONS:** If a screen, design, or component is NOT in the provided Figma design/Image/Prompt, DO NOT invent it.
3. **NO OVER-ENGINEERING:** Do NOT add complex state management, custom wrappers, or extra abstraction layers if simple code satisfies the requirement.
4. **NO UNTOUCHED CODE MODIFICATIONS:** Do NOT touch or refactor adjacent files/components unless required for the exact task.
5. **NO DEPENDENCY ADDITIONS:** Do NOT install extra npm packages without explicit permission.

---

## 🎯 SCOPE DEFINITION (WHAT TO FOLLOW)
* **Figma / Image Design:** Replicate the provided design image/Figma spec **EXACTLY as shown**. Match spacing, typography, colors, and layouts without modifying the design intent.
* **Code / Logic:** Write ONLY the business logic, types, or component code requested in the user prompt.
* **Imports & Exports:** Use existing project utilities, UI components, and directory structure without reinventing them.

---

## 📋 TASK EXECUTION CHECKLIST
Before outputting any code or completing a task, verify:
- [ ] Is this code strictly fulfilling ONLY the prompt / provided design?
- [ ] Did I refrain from adding extra features, comments, or extra utility functions?
- [ ] Did I keep the existing codebase intact?

> **Rule Summary:** If it's not in the design or prompt, it DOES NOT EXIST. Do exact work only.

Act as a Senior Frontend Developer. 

I will provide you with legacy HTML, CSS, JavaScript code, and image/asset paths. Your task is to convert this code EXACTLY as-is into a modern React + TypeScript + Tailwind CSS component, strictly adhering to the rules below.

---

### 🚨 STRICT CONVERSION RULES:
1. **EXACT REPLICATION (1:1 Conversion):**
   - Do NOT add new features, extra UI elements, additional buttons, or "nice-to-have" enhancements.
   - Do NOT modify the layout, styling, or structural hierarchy. Convert the provided CSS classes/styles directly to equivalent Tailwind CSS classes.
   - Match the provided HTML structure line-by-line.

2. **ASSET HANDLING:**
   - Keep image, icon, and asset paths EXACTLY as given in the HTML/assets directory (e.g., `/assets/images/...` or `./assets/...`). Do NOT rename asset paths or replace local images with external placeholders.

3. **JAVASCRIPT TO TYPESCRIPT LOGIC:**
   - Convert all vanilla JS logic (event listeners, DOM manipulations, array methods) into idiomatic React Hooks (`useState`, `useEffect`, `useRef`, etc.).
   - Explicitly define TypeScript types/interfaces for all props, states, and event handlers. Do NOT use `any`.

4. **NO OVER-ENGINEERING:**
   - Do NOT introduce external state management libraries (like Redux/Zustand) or complex wrappers unless explicitly requested.
   - Keep the file modular and clean. Export the component cleanly.

---

### 📥 INPUT CODE:

[PASTE YOUR HTML CODE HERE]

[PASTE YOUR CSS CODE HERE]

[PASTE YOUR JAVASCRIPT CODE HERE]

---

### 📤 OUTPUT REQUIREMENT:
Provide the fully typed, single-file or modular React component (`.tsx`) using Tailwind CSS, keeping the original logic and UI completely intact.