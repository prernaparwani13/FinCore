// Test script to verify slider reset to default values
const CALC_CONFIGS = {
  "SIP Calculator": {
    label1: "Monthly Investment", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Expected Return Rate", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
  },
  "RD Calculator": {
    label1: "Monthly Investment", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Rate of Interest (p.a.)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period", min3: 0, max3: 120, step3: 1, def3: 0,
    hasThirdSlider: true,
    isV2Currency: false,
  },
  "SSY Calculator": {
    label1: "Yearly Investment", min1: 250, max1: 150000, step1: 100, def1: 250,
    label2: "Girl's Age", min2: 0, max2: 10, step2: 1, def2: 0,
    label3: "Start Year", min3: 2021, max3: 2031, step3: 1, def3: 2021,
    hasThirdSlider: true,
    isV2Currency: false,
  }
};

function testSliderReset(calcTitle) {
  const config = CALC_CONFIGS[calcTitle];
  if (!config) {
    console.log(`Calculator "${calcTitle}" not found in test configs.`);
    return;
  }

  console.log(`Testing slider reset for ${calcTitle}:`);

  // Simulate the useEffect logic (using min values as per the fix)
  const v1 = config.min1;
  const v2 = config.min2;
  const v3 = config.min3 ?? (calcTitle === "SSY Calculator" ? 2024 : 0);
  const v4 = config.min4 ?? 0;

  const inputV1 = (config.def1 || config.min1).toLocaleString();
  const inputV2 = (config.def2 || config.min2).toString();
  const inputV3 = config.def3 ? config.def3.toString() : "2024";
  const inputTimePeriod = (config.def3 || config.min3 || 10).toLocaleString();

  console.log(`  v1 (Slider 1): ${v1} (input: ${inputV1})`);
  console.log(`  v2 (Slider 2): ${v2} (input: ${inputV2})`);
  console.log(`  v3 (Slider 3): ${v3} (input: ${inputV3})`);
  console.log(`  v4 (Slider 4): ${v4}`);
  console.log(`  inputTimePeriod: ${inputTimePeriod}`);
  console.log();

  // Check if defaults are different from mins
  const defaultsUsed = [];
  if (config.def1 && config.def1 !== config.min1) defaultsUsed.push(`Slider 1: ${config.def1} (min: ${config.min1})`);
  if (config.def2 && config.def2 !== config.min2) defaultsUsed.push(`Slider 2: ${config.def2} (min: ${config.min2})`);
  if (config.def3 && config.def3 !== config.min3) defaultsUsed.push(`Slider 3: ${config.def3} (min: ${config.min3})`);
  if (config.def4 && config.def4 !== config.min4) defaultsUsed.push(`Slider 4: ${config.def4} (min: ${config.min4})`);

  if (defaultsUsed.length > 0) {
    console.log(`  Defaults used (different from min):`);
    defaultsUsed.forEach(item => console.log(`    ${item}`));
  } else {
    console.log(`  All defaults are same as min values.`);
  }
  console.log();
}

// Test cases
console.log("Testing Slider Reset to Default Values:");
console.log("=======================================");

testSliderReset("SIP Calculator");
testSliderReset("RD Calculator");
testSliderReset("SSY Calculator");

console.log("All tests completed. If defaults are used correctly, sliders should reset to def values on calculator open/reopen.");
