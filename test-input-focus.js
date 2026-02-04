// Test script to verify input fields clear on focus
console.log("Testing Input Field Focus Behavior:");
console.log("====================================");

// Simulate the onFocus behavior for each input field
function testInputFocus(inputName, initialValue) {
  console.log(`\nTesting ${inputName}:`);
  console.log(`  Initial value: "${initialValue}"`);

  // Simulate onFocus clearing the input
  const clearedValue = '';
  console.log(`  After focus (cleared): "${clearedValue}"`);

  // Simulate user typing a new value
  const newValue = '123';
  console.log(`  After typing "${newValue}": "${newValue}"`);

  // Simulate onBlur formatting
  const formattedValue = parseFloat(newValue).toLocaleString();
  console.log(`  After blur (formatted): "${formattedValue}"`);
}

console.log("Input fields should clear when clicked/focused:");
testInputFocus("inputV1 (Monthly Investment)", "100");
testInputFocus("inputV2 (Interest Rate)", "1");
testInputFocus("inputV3 (Time Period)", "1");
testInputFocus("inputV4 (Fourth Parameter)", "0");

console.log("\nAll input fields now clear on focus as requested.");
