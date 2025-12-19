export const problemsDB = {
    // ==================== TRUE BEGINNER (5) ====================
    'print-hello': {
        id: 'print-hello',
        title: "Print Hello World",
        difficulty: "True Beginner",
        category: "Basics",
        description: "Write a function that returns the string 'Hello, World!'",
        examples: [
            {
                input: "printHello()",
                output: "'Hello, World!'"
            }
        ],
        constraints: [
            "Must return a string",
            "Exact match required"
        ],
        starterCode: "function printHello() {\n  // Your code here\n}",
        solution: "function printHello() {\n  return 'Hello, World!';\n}",
        testCases: [
            { input: [], expected: "Hello, World!" }
        ],
        hints: [
            "You need to use the 'return' keyword to send a value back from the function.",
            "Strings in JavaScript are wrapped in quotes - either single 'like this' or double \"like this\".",
            "Pseudocode: 1. Use the return keyword, 2. Write the exact string 'Hello, World!' with quotes"
        ]
    },

    'add-two-numbers': {
        id: 'add-two-numbers',
        title: "Add Two Numbers",
        difficulty: "True Beginner",
        category: "Math",
        description: "Write a function that takes two numbers and returns their sum.",
        examples: [
            {
                input: "add(2, 3)",
                output: "5"
            },
            {
                input: "add(10, -5)",
                output: "5"
            }
        ],
        constraints: [
            "Numbers can be positive or negative",
            "Return the sum"
        ],
        starterCode: "function add(a, b) {\n  // Your code here\n}",
        solution: "function add(a, b) {\n  return a + b;\n}",
        testCases: [
            { input: [2, 3], expected: 5 },
            { input: [10, -5], expected: 5 }
        ],
        hints: [
            "The + operator adds two numbers together in JavaScript.",
            "Remember to return the result - just calculating it isn't enough!",
            "Pseudocode: 1. Add a and b using the + operator, 2. Return the result"
        ]
    },

    'is-even': {
        id: 'is-even',
        title: "Is Number Even?",
        difficulty: "True Beginner",
        category: "Math",
        description: "Write a function that returns true if a number is even, false otherwise.",
        examples: [
            {
                input: "isEven(4)",
                output: "true"
            },
            {
                input: "isEven(7)",
                output: "false"
            }
        ],
        constraints: [
            "Use the modulo operator %",
            "Return a boolean"
        ],
        starterCode: "function isEven(num) {\n  // Your code here\n}",
        solution: "function isEven(num) {\n  return num % 2 === 0;\n}",
        testCases: [
            { input: [4], expected: true },
            { input: [7], expected: false }
        ],
        hints: [
            "Even numbers are divisible by 2 with no remainder. How can you check for a remainder?",
            "The modulo operator (%) gives you the remainder when dividing. For example: 7 % 2 = 1, but 4 % 2 = 0.",
            "Pseudocode: 1. Use num % 2 to get remainder, 2. Check if remainder === 0, 3. Return true or false"
        ]
    },

    'find-max': {
        id: 'find-max',
        title: "Find Maximum",
        difficulty: "True Beginner",
        category: "Math",
        description: "Write a function that returns the larger of two numbers.",
        examples: [
            {
                input: "findMax(5, 10)",
                output: "10"
            },
            {
                input: "findMax(-3, -8)",
                output: "-3"
            }
        ],
        constraints: [
            "Return the larger number",
            "Works with negative numbers"
        ],
        starterCode: "function findMax(a, b) {\n  // Your code here\n}",
        solution: "function findMax(a, b) {\n  return a > b ? a : b;\n}",
        testCases: [
            { input: [5, 10], expected: 10 },
            { input: [-3, -8], expected: -3 }
        ],
        hints: [
            "You need to compare the two numbers. What operator compares which number is bigger?",
            "You can use an if statement to check if a > b, or use the ternary operator (condition ? valueIfTrue : valueIfFalse).",
            "Pseudocode: 1. Compare a and b, 2. If a is greater, return a, 3. Otherwise return b"
        ]
    },

    'count-vowels': {
        id: 'count-vowels',
        title: "Count Vowels",
        difficulty: "True Beginner",
        category: "Strings",
        description: "Write a function that counts the number of vowels (a, e, i, o, u) in a string.",
        examples: [
            {
                input: 'countVowels("hello")',
                output: "2"
            },
            {
                input: 'countVowels("sky")',
                output: "0"
            }
        ],
        constraints: [
            "Count both uppercase and lowercase vowels",
            "Return a number"
        ],
        starterCode: "function countVowels(str) {\n  // Your code here\n}",
        solution: "function countVowels(str) {\n  const vowels = 'aeiouAEIOU';\n  let count = 0;\n  for (let char of str) {\n    if (vowels.includes(char)) count++;\n  }\n  return count;\n}",
        testCases: [
            { input: ["hello"], expected: 2 },
            { input: ["sky"], expected: 0 }
        ],
        hints: [
            "You'll need to loop through each character in the string and check if it's a vowel.",
            "Create a string containing all vowels 'aeiouAEIOU', then use .includes() to check if each character is in that string.",
            "Pseudocode: 1. Create count = 0, 2. Loop through each character, 3. If character is a vowel, add 1 to count, 4. Return count"
        ]
    },

    // ==================== BEGINNER (8) ====================
    'two-sum': {
        id: 'two-sum',
        title: "Two Sum",
        difficulty: "Beginner",
        category: "Arrays",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "Only one valid answer exists"
        ],
        starterCode: "function twoSum(nums, target) {\n  // Your code here\n}",
        solution: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}",
        testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { input: [[3, 2, 4], 6], expected: [1, 2] }
        ],
        hints: [
            "For each number, you need to find if there's another number that adds up to the target. What if you stored numbers you've already seen?",
            "Use a Map (hash table) to store each number and its index as you loop through. For each number, check if (target - current number) exists in the map.",
            "Pseudocode: 1. Create empty Map, 2. Loop through array, 3. Calculate complement = target - current number, 4. If complement exists in map, return [map.get(complement), current index], 5. Store current number and index in map"
        ]
    },

    'valid-parentheses': {
        id: 'valid-parentheses',
        title: "Valid Parentheses",
        difficulty: "Beginner",
        category: "Stack",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            {
                input: 's = "()"',
                output: "true"
            },
            {
                input: 's = "()[]{}"',
                output: "true"
            },
            {
                input: 's = "(]"',
                output: "false"
            }
        ],
        constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'."
        ],
        starterCode: "function isValid(s) {\n  // Your code here\n}",
        solution: "function isValid(s) {\n  const stack = [];\n  const pairs = { '(': ')', '{': '}', '[': ']' };\n  for (let char of s) {\n    if (pairs[char]) {\n      stack.push(char);\n    } else {\n      if (pairs[stack.pop()] !== char) return false;\n    }\n  }\n  return stack.length === 0;\n}",
        testCases: [
            { input: ["()"], expected: true },
            { input: ["()[]{}"], expected: true },
            { input: ["(]"], expected: false }
        ],
        hints: [
            "When you see an opening bracket '(', '{', or '[', where should you store it so you can match it with the closing bracket later?",
            "Use a Stack! When you see an opening bracket, push it onto the stack. When you see a closing bracket, check if it matches the top of the stack, then pop.",
            "Pseudocode: 1. Create empty stack, 2. Loop through each character, 3. If opening bracket → push to stack, 4. If closing bracket → check if stack top matches, then pop (return false if no match), 5. At end, stack should be empty (return stack.length === 0)"
        ]
    },

    'reverse-string': {
        id: 'reverse-string',
        title: "Reverse String",
        difficulty: "Beginner",
        category: "Strings",
        description: "Write a function that reverses a string. The input string is given as an array of characters.",
        examples: [
            {
                input: 's = ["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]'
            }
        ],
        constraints: [
            "Modify the array in-place",
            "O(1) extra space"
        ],
        starterCode: "function reverseString(s) {\n  // Your code here\n}",
        solution: "function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n  return s;\n}",
        testCases: [
            { input: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"] }
        ],
        hints: [
            "Since you need to modify in-place, you can't create a new array. What if you swap characters from both ends working toward the middle?",
            "Use two pointers - one starting at the beginning (left) and one at the end (right). Swap them, then move both pointers toward the center.",
            "Pseudocode: 1. Set left = 0, right = array.length - 1, 2. While left < right, swap s[left] and s[right], 3. Increment left, decrement right, 4. Return s"
        ]
    },

    'fizzbuzz': {
        id: 'fizzbuzz',
        title: "FizzBuzz",
        difficulty: "Beginner",
        category: "Logic",
        description: "Given an integer n, return a string array where: for multiples of 3, add 'Fizz', for multiples of 5, add 'Buzz', for multiples of both, add 'FizzBuzz', otherwise add the number as a string.",
        examples: [
            {
                input: "n = 5",
                output: '["1","2","Fizz","4","Buzz"]'
            }
        ],
        constraints: [
            "1 <= n <= 10^4"
        ],
        starterCode: "function fizzBuzz(n) {\n  // Your code here\n}",
        solution: "function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push('FizzBuzz');\n    else if (i % 3 === 0) result.push('Fizz');\n    else if (i % 5 === 0) result.push('Buzz');\n    else result.push(String(i));\n  }\n  return result;\n}",
        testCases: [
            { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] }
        ],
        hints: [
            "You'll need to loop from 1 to n and check each number. How do you check if a number is divisible by 3 or 5?",
            "Use the modulo operator (%). Check for divisibility by both 3 AND 5 first (i % 15 === 0), then check 3, then 5, then default to the number.",
            "Pseudocode: 1. Create empty result array, 2. Loop i from 1 to n, 3. If i divisible by 15 → push 'FizzBuzz', 4. Else if divisible by 3 → push 'Fizz', 5. Else if divisible by 5 → push 'Buzz', 6. Else push String(i), 7. Return result"
        ]
    },

    'palindrome-number': {
        id: 'palindrome-number',
        title: "Palindrome Number",
        difficulty: "Beginner",
        category: "Math",
        description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
        examples: [
            {
                input: "x = 121",
                output: "true"
            },
            {
                input: "x = -121",
                output: "false",
                explanation: "From left to right, it reads -121. From right to left, it becomes 121-."
            }
        ],
        constraints: [
            "-2^31 <= x <= 2^31 - 1"
        ],
        starterCode: "function isPalindrome(x) {\n  // Your code here\n}",
        solution: "function isPalindrome(x) {\n  if (x < 0) return false;\n  const str = String(x);\n  return str === str.split('').reverse().join('');\n}",
        testCases: [
            { input: [121], expected: true },
            { input: [-121], expected: false }
        ],
        hints: [
            "A palindrome reads the same forwards and backwards. Negative numbers can't be palindromes because of the minus sign. How can you check if something reads the same both ways?",
            "Convert the number to a string, then reverse it and compare. You can use split(''), reverse(), and join('') to reverse a string.",
            "Pseudocode: 1. If x < 0, return false, 2. Convert x to string, 3. Reverse the string, 4. Compare original string to reversed string, 5. Return true if equal"
        ]
    },

    'contains-duplicate': {
        id: 'contains-duplicate',
        title: "Contains Duplicate",
        difficulty: "Beginner",
        category: "Arrays",
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        examples: [
            {
                input: "nums = [1,2,3,1]",
                output: "true"
            },
            {
                input: "nums = [1,2,3,4]",
                output: "false"
            }
        ],
        constraints: [
            "1 <= nums.length <= 10^5"
        ],
        starterCode: "function containsDuplicate(nums) {\n  // Your code here\n}",
        solution: "function containsDuplicate(nums) {\n  const seen = new Set();\n  for (let num of nums) {\n    if (seen.has(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}",
        testCases: [
            { input: [[1, 2, 3, 1]], expected: true },
            { input: [[1, 2, 3, 4]], expected: false }
        ],
        hints: [
            "You need to track which numbers you've already seen. What data structure is good for checking 'have I seen this before?'",
            "Use a Set to store numbers you've encountered. As you loop through, check if the current number is already in the Set.",
            "Pseudocode: 1. Create empty Set, 2. Loop through each number, 3. If number is in Set, return true (found duplicate!), 4. Add number to Set, 5. If loop finishes, return false (no duplicates)"
        ]
    },

    'missing-number': {
        id: 'missing-number',
        title: "Missing Number",
        difficulty: "Beginner",
        category: "Arrays",
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
        examples: [
            {
                input: "nums = [3,0,1]",
                output: "2"
            },
            {
                input: "nums = [0,1]",
                output: "2"
            }
        ],
        constraints: [
            "n == nums.length",
            "1 <= n <= 10^4"
        ],
        starterCode: "function missingNumber(nums) {\n  // Your code here\n}",
        solution: "function missingNumber(nums) {\n  const n = nums.length;\n  const expectedSum = (n * (n + 1)) / 2;\n  const actualSum = nums.reduce((a, b) => a + b, 0);\n  return expectedSum - actualSum;\n}",
        testCases: [
            { input: [[3, 0, 1]], expected: 2 },
            { input: [[0, 1]], expected: 2 }
        ],
        hints: [
            "If you had all numbers from 0 to n, what would their sum be? What if you compare that to the actual sum?",
            "Use the formula for sum of first n numbers: n * (n + 1) / 2. Calculate what the sum SHOULD be, then subtract the actual sum.",
            "Pseudocode: 1. n = array length, 2. expectedSum = n * (n + 1) / 2, 3. actualSum = sum of all numbers in array, 4. Return expectedSum - actualSum"
        ]
    },

    'single-number': {
        id: 'single-number',
        title: "Single Number",
        difficulty: "Beginner",
        category: "Bit Manipulation",
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
        examples: [
            {
                input: "nums = [2,2,1]",
                output: "1"
            },
            {
                input: "nums = [4,1,2,1,2]",
                output: "4"
            }
        ],
        constraints: [
            "1 <= nums.length <= 3 * 10^4",
            "Each element appears twice except for one"
        ],
        starterCode: "function singleNumber(nums) {\n  // Your code here\n}",
        solution: "function singleNumber(nums) {\n  let result = 0;\n  for (let num of nums) {\n    result ^= num;\n  }\n  return result;\n}",
        testCases: [
            { input: [[2, 2, 1]], expected: 1 },
            { input: [[4, 1, 2, 1, 2]], expected: 4 }
        ],
        hints: [
            "You could use a Set - add numbers you see for the first time, remove them when you see them again. What's left is the single number.",
            "For a more advanced solution: XOR (^) has a special property - any number XOR'd with itself equals 0, and any number XOR'd with 0 equals itself.",
            "Pseudocode (Set approach): 1. Create empty Set, 2. Loop through numbers, 3. If number in Set, remove it, 4. Else add it, 5. Return the one remaining number in Set"
        ]
    },

    // Continue with INTERMEDIATE and ADVANCED...
    // I'll add hints for a few more to show the pattern:

    'binary-search': {
        id: 'binary-search',
        title: "Binary Search",
        difficulty: "Intermediate",
        category: "Searching",
        description: "Given a sorted array of integers nums and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
        examples: [
            {
                input: "nums = [-1,0,3,5,9,12], target = 9",
                output: "4"
            },
            {
                input: "nums = [-1,0,3,5,9,12], target = 2",
                output: "-1"
            }
        ],
        constraints: [
            "All integers in nums are unique",
            "nums is sorted in ascending order"
        ],
        starterCode: "function search(nums, target) {\n  // Your code here\n}",
        solution: "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
        testCases: [
            { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
            { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 }
        ],
        hints: [
            "Since the array is sorted, you don't need to check every element. Start in the middle - if the target is smaller, it must be in the left half. If larger, it must be in the right half.",
            "Use two pointers (left and right). Calculate mid = (left + right) / 2. Compare nums[mid] to target and eliminate half the search space each time.",
            "Pseudocode: 1. Set left = 0, right = length - 1, 2. While left <= right: calculate mid, 3. If nums[mid] === target, return mid, 4. If nums[mid] < target, search right half (left = mid + 1), 5. Else search left half (right = mid - 1), 6. If not found, return -1"
        ]
    },

    'max-subarray': {
        id: 'max-subarray',
        title: "Maximum Subarray",
        difficulty: "Intermediate",
        category: "Dynamic Programming",
        description: "Given an integer array nums, find the contiguous subarray with the largest sum, and return its sum.",
        examples: [
            {
                input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                output: "6",
                explanation: "[4,-1,2,1] has the largest sum = 6"
            }
        ],
        constraints: [
            "1 <= nums.length <= 10^5"
        ],
        starterCode: "function maxSubArray(nums) {\n  // Your code here\n}",
        solution: "function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}",
        testCases: [
            { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 }
        ],
        hints: [
            "At each position, you have a choice: either continue the current subarray by adding this number, or start a new subarray from this number. Which gives a bigger sum?",
            "This is Kadane's Algorithm. Keep track of the current sum and the maximum sum seen so far. At each element, decide: currentSum + num vs just num.",
            "Pseudocode: 1. maxSum = first element, currentSum = first element, 2. Loop from index 1, 3. currentSum = max(current number, currentSum + current number), 4. maxSum = max(maxSum, currentSum), 5. Return maxSum"
        ]
    },
    // ==================== INTERMEDIATE (continued) ====================

    'climbing-stairs': {
        id: 'climbing-stairs',
        title: "Climbing Stairs",
        difficulty: "Intermediate",
        category: "Dynamic Programming",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
            {
                input: "n = 2",
                output: "2",
                explanation: "1. 1 step + 1 step\n2. 2 steps"
            },
            {
                input: "n = 3",
                output: "3",
                explanation: "1. 1+1+1\n2. 1+2\n3. 2+1"
            }
        ],
        constraints: [
            "1 <= n <= 45"
        ],
        starterCode: "function climbStairs(n) {\n  // Your code here\n}",
        solution: "function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev = 1, curr = 2;\n  for (let i = 3; i <= n; i++) {\n    const temp = curr;\n    curr = prev + curr;\n    prev = temp;\n  }\n  return curr;\n}",
        testCases: [
            { input: [2], expected: 2 },
            { input: [3], expected: 3 }
        ],
        hints: [
            "To reach step n, you could have come from step n-1 (and take 1 step) or from step n-2 (and take 2 steps). How many ways can you reach each of those?",
            "This is actually the Fibonacci sequence! ways(n) = ways(n-1) + ways(n-2). Start with ways(1) = 1 and ways(2) = 2.",
            "Pseudocode: 1. If n <= 2, return n, 2. Set prev = 1, curr = 2, 3. Loop from 3 to n, 4. temp = curr, curr = prev + curr, prev = temp, 5. Return curr"
        ]
    },

    'best-time-stock': {
        id: 'best-time-stock',
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit.",
        examples: [
            {
                input: "prices = [7,1,5,3,6,4]",
                output: "5",
                explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5"
            }
        ],
        constraints: [
            "1 <= prices.length <= 10^5"
        ],
        starterCode: "function maxProfit(prices) {\n  // Your code here\n}",
        solution: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}",
        testCases: [
            { input: [[7, 1, 5, 3, 6, 4]], expected: 5 }
        ],
        hints: [
            "You want to buy at the lowest price and sell at a higher price later. As you go through the array, what's the lowest price you've seen so far?",
            "Keep track of the minimum price seen so far. At each day, calculate the profit if you sold today (current price - minimum price). Track the maximum profit.",
            "Pseudocode: 1. minPrice = Infinity, maxProfit = 0, 2. Loop through prices, 3. Update minPrice = min(minPrice, current price), 4. Update maxProfit = max(maxProfit, current price - minPrice), 5. Return maxProfit"
        ]
    },

    'rotate-array': {
        id: 'rotate-array',
        title: "Rotate Array",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "Given an array, rotate the array to the right by k steps, where k is non-negative.",
        examples: [
            {
                input: "nums = [1,2,3,4,5,6,7], k = 3",
                output: "[5,6,7,1,2,3,4]"
            }
        ],
        constraints: [
            "1 <= nums.length <= 10^5",
            "Modify array in-place"
        ],
        starterCode: "function rotate(nums, k) {\n  // Your code here\n}",
        solution: "function rotate(nums, k) {\n  k = k % nums.length;\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n}\n\nfunction reverse(arr, start, end) {\n  while (start < end) {\n    [arr[start], arr[end]] = [arr[end], arr[start]];\n    start++;\n    end--;\n  }\n}",
        testCases: [
            { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4] }
        ],
        hints: [
            "Rotating right by k is like taking the last k elements and moving them to the front. But can you do this in-place without extra space?",
            "Use the reversal algorithm: 1) Reverse entire array, 2) Reverse first k elements, 3) Reverse remaining elements. This gives you the rotation!",
            "Pseudocode: 1. k = k % array.length (handle k > length), 2. Reverse entire array, 3. Reverse first k elements, 4. Reverse elements from k to end"
        ]
    },

    'product-except-self': {
        id: 'product-except-self',
        title: "Product of Array Except Self",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
        examples: [
            {
                input: "nums = [1,2,3,4]",
                output: "[24,12,8,6]"
            }
        ],
        constraints: [
            "Do not use division",
            "O(n) time complexity"
        ],
        starterCode: "function productExceptSelf(nums) {\n  // Your code here\n}",
        solution: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return result;\n}",
        testCases: [
            { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] }
        ],
        hints: [
            "For each position, you need the product of everything to its left AND everything to its right. Can you calculate these separately?",
            "Use two passes: First pass calculates prefix products (product of all elements before i). Second pass calculates suffix products (product of all elements after i) and multiplies with prefix.",
            "Pseudocode: 1. Create result array filled with 1s, 2. First loop: result[i] = product of all elements before i, 3. Second loop (backwards): multiply result[i] by product of all elements after i, 4. Return result"
        ]
    },

    'longest-substring': {
        id: 'longest-substring',
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Intermediate",
        category: "Strings",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: [
            {
                input: 's = "abcabcbb"',
                output: "3",
                explanation: 'The answer is "abc", with length 3'
            },
            {
                input: 's = "bbbbb"',
                output: "1"
            }
        ],
        constraints: [
            "0 <= s.length <= 5 * 10^4"
        ],
        starterCode: "function lengthOfLongestSubstring(s) {\n  // Your code here\n}",
        solution: "function lengthOfLongestSubstring(s) {\n  const seen = new Map();\n  let maxLen = 0;\n  let start = 0;\n  for (let end = 0; end < s.length; end++) {\n    if (seen.has(s[end])) {\n      start = Math.max(start, seen.get(s[end]) + 1);\n    }\n    seen.set(s[end], end);\n    maxLen = Math.max(maxLen, end - start + 1);\n  }\n  return maxLen;\n}",
        testCases: [
            { input: ["abcabcbb"], expected: 3 },
            { input: ["bbbbb"], expected: 1 }
        ],
        hints: [
            "Use a sliding window approach. Expand the window by moving the right pointer. When you find a duplicate, shrink from the left.",
            "Keep a Map to store each character's most recent index. When you encounter a duplicate, move your start pointer to just after the previous occurrence.",
            "Pseudocode: 1. Create Map for seen characters, start = 0, maxLen = 0, 2. Loop with end pointer, 3. If char at end is in Map, move start to max(start, last seen index + 1), 4. Store current char and index in Map, 5. Update maxLen = max(maxLen, end - start + 1)"
        ]
    },

    'merge-intervals': {
        id: 'merge-intervals',
        title: "Merge Intervals",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.",
        examples: [
            {
                input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
                output: "[[1,6],[8,10],[15,18]]"
            }
        ],
        constraints: [
            "1 <= intervals.length <= 10^4"
        ],
        starterCode: "function merge(intervals) {\n  // Your code here\n}",
        solution: "function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = merged[merged.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      merged.push(intervals[i]);\n    }\n  }\n  return merged;\n}",
        testCases: [
            { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] }
        ],
        hints: [
            "If intervals are sorted by start time, overlapping intervals will be next to each other. Should you sort first?",
            "Sort intervals by start time. Then iterate through them - if current interval overlaps with the last merged interval, merge them by extending the end time.",
            "Pseudocode: 1. Sort intervals by start time, 2. Initialize merged array with first interval, 3. For each interval, if it overlaps with last in merged (current start <= last end), extend the end, 4. Else add as new interval, 5. Return merged"
        ]
    },

    'invert-binary-tree': {
        id: 'invert-binary-tree',
        title: "Invert Binary Tree",
        difficulty: "Intermediate",
        category: "Trees",
        description: "Given the root of a binary tree, invert the tree, and return its root.",
        examples: [
            {
                input: "root = [4,2,7,1,3,6,9]",
                output: "[4,7,2,9,6,3,1]"
            }
        ],
        constraints: [
            "The number of nodes in the tree is in the range [0, 100]"
        ],
        starterCode: "function invertTree(root) {\n  // Your code here\n}",
        solution: "function invertTree(root) {\n  if (!root) return null;\n  [root.left, root.right] = [root.right, root.left];\n  invertTree(root.left);\n  invertTree(root.right);\n  return root;\n}",
        testCases: [],
        hints: [
            "Inverting means swapping left and right children at every node. Can you do this recursively?",
            "For each node: swap its left and right children, then recursively invert the left subtree and right subtree.",
            "Pseudocode: 1. Base case: if root is null, return null, 2. Swap root.left and root.right, 3. Recursively invert root.left, 4. Recursively invert root.right, 5. Return root"
        ]
    },

    // ==================== ADVANCED ====================

    'word-break': {
        id: 'word-break',
        title: "Word Break",
        difficulty: "Advanced",
        category: "Dynamic Programming",
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        examples: [
            {
                input: 's = "leetcode", wordDict = ["leet","code"]',
                output: "true"
            },
            {
                input: 's = "applepenapple", wordDict = ["apple","pen"]',
                output: "true"
            }
        ],
        constraints: [
            "1 <= s.length <= 300",
            "1 <= wordDict.length <= 1000"
        ],
        starterCode: "function wordBreak(s, wordDict) {\n  // Your code here\n}",
        solution: "function wordBreak(s, wordDict) {\n  const wordSet = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && wordSet.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}",
        testCases: [
            { input: ["leetcode", ["leet", "code"]], expected: true }
        ],
        hints: [
            "Can you break this into smaller subproblems? If you know whether s[0...i] can be segmented, can you use that to determine if s[0...i+k] can be segmented?",
            "Use Dynamic Programming. dp[i] means 'can s[0...i-1] be segmented?'. For each position i, check all positions j before it - if dp[j] is true AND s[j...i] is in dictionary, then dp[i] is true.",
            "Pseudocode: 1. Convert wordDict to Set for O(1) lookup, 2. Create dp array, dp[0] = true (empty string), 3. For each position i from 1 to length, 4. For each position j from 0 to i, 5. If dp[j] is true AND substring(j, i) is in Set, set dp[i] = true, 6. Return dp[length]"
        ]
    },

    'coin-change': {
        id: 'coin-change',
        title: "Coin Change",
        difficulty: "Advanced",
        category: "Dynamic Programming",
        description: "You are given an integer array coins representing different denominations and an integer amount. Return the fewest number of coins needed to make up that amount.",
        examples: [
            {
                input: "coins = [1,2,5], amount = 11",
                output: "3",
                explanation: "11 = 5 + 5 + 1"
            }
        ],
        constraints: [
            "1 <= coins.length <= 12",
            "If impossible, return -1"
        ],
        starterCode: "function coinChange(coins, amount) {\n  // Your code here\n}",
        solution: "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (let coin of coins) {\n      if (i >= coin) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
        testCases: [
            { input: [[1, 2, 5], 11], expected: 3 }
        ],
        hints: [
            "This is an unbounded knapsack problem. For each amount, you can choose to use any coin (multiple times). What's the minimum coins needed for smaller amounts?",
            "Use DP where dp[i] = minimum coins needed to make amount i. For each amount, try using each coin and take the minimum.",
            "Pseudocode: 1. Create dp array size amount+1, fill with Infinity, dp[0] = 0, 2. For each amount from 1 to target, 3. For each coin, 4. If amount >= coin, dp[amount] = min(dp[amount], dp[amount - coin] + 1), 5. Return dp[amount] or -1 if still Infinity"
        ]
    },

    'lru-cache': {
        id: 'lru-cache',
        title: "LRU Cache",
        difficulty: "Advanced",
        category: "Design",
        description: "Design a data structure that follows Least Recently Used (LRU) cache. Implement get(key) and put(key, value).",
        examples: [
            {
                input: 'LRUCache cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1);',
                output: "1"
            }
        ],
        constraints: [
            "1 <= capacity <= 3000",
            "0 <= key <= 10^4",
            "Both operations must be O(1)"
        ],
        starterCode: "class LRUCache {\n  constructor(capacity) {\n    // Your code here\n  }\n  \n  get(key) {\n    // Your code here\n  }\n  \n  put(key, value) {\n    // Your code here\n  }\n}",
        solution: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  \n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  \n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}",
        testCases: [],
        hints: [
            "You need O(1) access AND you need to track order of use. What data structure maintains insertion order and allows O(1) access?",
            "JavaScript's Map maintains insertion order! When you access or add a key, delete it first then re-add it to move it to the end (most recent).",
            "Pseudocode for get: 1. If key not in cache, return -1, 2. Get value, delete key, re-insert key with value (moves to end), 3. Return value. For put: 1. If key exists, delete it, 2. Insert key-value, 3. If size > capacity, delete first (oldest) key"
        ]
    },

    'trapping-rain-water': {
        id: 'trapping-rain-water',
        title: "Trapping Rain Water",
        difficulty: "Advanced",
        category: "Arrays",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: [
            {
                input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
                output: "6"
            }
        ],
        constraints: [
            "n == height.length",
            "1 <= n <= 2 * 10^4"
        ],
        starterCode: "function trap(height) {\n  // Your code here\n}",
        solution: "function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0;\n  let water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left];\n      else water += leftMax - height[left];\n      left++;\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right];\n      else water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}",
        testCases: [
            { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 }
        ],
        hints: [
            "At each position, water level is determined by the minimum of (max height to its left, max height to its right). Water trapped = min(leftMax, rightMax) - current height.",
            "Use two pointers from both ends. Track leftMax and rightMax. Move the pointer with smaller height and add water if current height is less than the max on that side.",
            "Pseudocode: 1. left = 0, right = length-1, leftMax = 0, rightMax = 0, water = 0, 2. While left < right, 3. If height[left] < height[right], process left side, else right side, 4. For the side being processed: if current >= max, update max; else add (max - current) to water, 5. Return water"
        ]
    },

    'serialize-tree': {
        id: 'serialize-tree',
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Advanced",
        category: "Trees",
        description: "Design an algorithm to serialize and deserialize a binary tree.",
        examples: [
            {
                input: "root = [1,2,3,null,null,4,5]",
                output: "[1,2,3,null,null,4,5]"
            }
        ],
        constraints: [
            "The number of nodes in the tree is in the range [0, 10^4]"
        ],
        starterCode: "function serialize(root) {\n  // Your code here\n}\n\nfunction deserialize(data) {\n  // Your code here\n}",
        solution: "function serialize(root) {\n  if (!root) return 'null';\n  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);\n}\n\nfunction deserialize(data) {\n  const values = data.split(',');\n  function build() {\n    const val = values.shift();\n    if (val === 'null') return null;\n    const node = { val: parseInt(val), left: null, right: null };\n    node.left = build();\n    node.right = build();\n    return node;\n  }\n  return build();\n}",
        testCases: [],
        hints: [
            "You need a way to represent the tree structure as a string. Preorder traversal (root, left, right) works well. How do you represent null nodes?",
            "For serialize: Do preorder traversal, convert each node value to string and join with commas. Use 'null' for empty nodes. For deserialize: Split string and recursively build tree.",
            "Pseudocode serialize: 1. If root is null, return 'null', 2. Return root.val + ',' + serialize(left) + ',' + serialize(right). Deserialize: 1. Split string by comma, 2. Use helper function that shifts first value, 3. If 'null' return null, 4. Create node, recursively build left and right, 5. Return node"
        ]
    },

    'median-data-stream': {
        id: 'median-data-stream',
        title: "Find Median from Data Stream",
        difficulty: "Advanced",
        category: "Heap",
        description: "Design a data structure that supports adding integers from a data stream and finding the median.",
        examples: [
            {
                input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()",
                output: "1.5, 2.0"
            }
        ],
        constraints: [
            "-10^5 <= num <= 10^5",
            "findMedian must be O(1) or O(log n)"
        ],
        starterCode: "class MedianFinder {\n  constructor() {\n    // Your code here\n  }\n  \n  addNum(num) {\n    // Your code here\n  }\n  \n  findMedian() {\n    // Your code here\n  }\n}",
        solution: "class MedianFinder {\n  constructor() {\n    this.nums = [];\n  }\n  \n  addNum(num) {\n    if (this.nums.length === 0) {\n      this.nums.push(num);\n      return;\n    }\n    let left = 0, right = this.nums.length;\n    while (left < right) {\n      const mid = Math.floor((left + right) / 2);\n      if (this.nums[mid] < num) left = mid + 1;\n      else right = mid;\n    }\n    this.nums.splice(left, 0, num);\n  }\n  \n  findMedian() {\n    const n = this.nums.length;\n    if (n % 2 === 0) {\n      return (this.nums[n/2 - 1] + this.nums[n/2]) / 2;\n    }\n    return this.nums[Math.floor(n/2)];\n  }\n}",
        testCases: [],
        hints: [
            "The median is the middle value when numbers are sorted. If you keep the numbers sorted, finding median is easy. How can you efficiently insert into a sorted array?",
            "Use binary search to find the correct position to insert each new number, keeping the array sorted. Then median is just the middle element(s).",
            "Pseudocode addNum: 1. Use binary search to find insertion position, 2. Insert number at that position. FindMedian: 1. If odd length, return middle element, 2. If even, return average of two middle elements"
        ]
    },

    'regular-expression': {
        id: 'regular-expression',
        title: "Regular Expression Matching",
        difficulty: "Advanced",
        category: "Dynamic Programming",
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
        examples: [
            {
                input: 's = "aa", p = "a"',
                output: "false"
            },
            {
                input: 's = "aa", p = "a*"',
                output: "true"
            }
        ],
        constraints: [
            "1 <= s.length <= 20",
            "'.' Matches any single character",
            "'*' Matches zero or more of the preceding element"
        ],
        starterCode: "function isMatch(s, p) {\n  // Your code here\n}",
        solution: "function isMatch(s, p) {\n  const dp = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));\n  dp[0][0] = true;\n  for (let j = 1; j <= p.length; j++) {\n    if (p[j-1] === '*') dp[0][j] = dp[0][j-2];\n  }\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 1; j <= p.length; j++) {\n      if (p[j-1] === '*') {\n        dp[i][j] = dp[i][j-2] || (dp[i-1][j] && (s[i-1] === p[j-2] || p[j-2] === '.'));\n      } else {\n        dp[i][j] = dp[i-1][j-1] && (s[i-1] === p[j-1] || p[j-1] === '.');\n      }\n    }\n  }\n  return dp[s.length][p.length];\n}",
        testCases: [
            { input: ["aa", "a"], expected: false },
            { input: ["aa", "a*"], expected: true }
        ],
        hints: [
            "This requires 2D DP. dp[i][j] means 'does s[0...i-1] match p[0...j-1]?'. Handle '.' by treating it as matching any character. '*' is tricky - it can match zero or more of the preceding character.",
            "For '*': You can either ignore it and the preceding char (match zero times), or if characters match, use the result from one position back in s (match one or more times).",
            "Pseudocode: 1. Create 2D DP table, dp[0][0] = true, 2. Handle patterns starting with * in first row, 3. For each cell, if pattern char is *, check zero matches OR (char matches AND one-or-more matches), 4. Else check if chars match (or '.') AND previous substrings matched, 5. Return dp[s.length][p.length]"
        ]
    },
    // ==================== ADD THESE 20 NEW PROBLEMS ====================

    // TRUE BEGINNER (5 new)
    'array-sum': {
        id: 'array-sum',
        title: "Sum of Array",
        difficulty: "True Beginner",
        category: "Arrays",
        description: "Write a function that returns the sum of all numbers in an array.",
        examples: [
            { input: "sumArray([1, 2, 3, 4])", output: "10" },
            { input: "sumArray([10, -5, 3])", output: "8" }
        ],
        constraints: ["Array contains at least one number"],
        starterCode: "function sumArray(arr) {\n  // Your code here\n}",
        solution: "function sumArray(arr) {\n  return arr.reduce((sum, num) => sum + num, 0);\n}",
        testCases: [
            { input: [[1, 2, 3, 4]], expected: 10 },
            { input: [[10, -5, 3]], expected: 8 }
        ],
        hints: [
            "Think about how to add numbers together one by one as you go through the array.",
            "You could use a loop with a variable to keep track of the running total, or use the reduce() method.",
            "Pseudocode: 1. Start with sum = 0, 2. Loop through each number, 3. Add number to sum, 4. Return sum"
        ]
    },

    'first-last-char': {
        id: 'first-last-char',
        title: "First and Last Character",
        difficulty: "True Beginner",
        category: "Strings",
        description: "Write a function that returns the first and last character of a string concatenated together.",
        examples: [
            { input: 'firstLast("hello")', output: '"ho"' },
            { input: 'firstLast("a")', output: '"aa"' }
        ],
        constraints: ["String has at least one character"],
        starterCode: "function firstLast(str) {\n  // Your code here\n}",
        solution: "function firstLast(str) {\n  return str[0] + str[str.length - 1];\n}",
        testCases: [
            { input: ["hello"], expected: "ho" },
            { input: ["a"], expected: "aa" }
        ],
        hints: [
            "How do you access the first character of a string? What about the last one?",
            "Use bracket notation with index 0 for first, and str.length - 1 for last.",
            "Pseudocode: 1. Get first char at index 0, 2. Get last char at index length-1, 3. Combine with +"
        ]
    },

    'repeat-string': {
        id: 'repeat-string',
        title: "Repeat String",
        difficulty: "True Beginner",
        category: "Strings",
        description: "Write a function that repeats a string n times.",
        examples: [
            { input: 'repeatString("ha", 3)', output: '"hahaha"' },
            { input: 'repeatString("x", 5)', output: '"xxxxx"' }
        ],
        constraints: ["n is always positive"],
        starterCode: "function repeatString(str, n) {\n  // Your code here\n}",
        solution: "function repeatString(str, n) {\n  return str.repeat(n);\n}",
        testCases: [
            { input: ["ha", 3], expected: "hahaha" },
            { input: ["x", 5], expected: "xxxxx" }
        ],
        hints: [
            "You could use a loop to concatenate the string n times, or use a built-in method.",
            "JavaScript has a .repeat() method that does exactly this!",
            "Pseudocode: Use str.repeat(n) to repeat the string n times"
        ]
    },

    'array-includes': {
        id: 'array-includes',
        title: "Array Includes Element",
        difficulty: "True Beginner",
        category: "Arrays",
        description: "Write a function that returns true if an array contains a specific element, false otherwise.",
        examples: [
            { input: "arrayIncludes([1, 2, 3], 2)", output: "true" },
            { input: "arrayIncludes([1, 2, 3], 5)", output: "false" }
        ],
        constraints: ["Array can be empty"],
        starterCode: "function arrayIncludes(arr, element) {\n  // Your code here\n}",
        solution: "function arrayIncludes(arr, element) {\n  return arr.includes(element);\n}",
        testCases: [
            { input: [[1, 2, 3], 2], expected: true },
            { input: [[1, 2, 3], 5], expected: false }
        ],
        hints: [
            "You could loop through and check each element, or use a built-in array method.",
            "The .includes() method checks if an array contains a value.",
            "Pseudocode: Return arr.includes(element)"
        ]
    },

    'capitalize-first': {
        id: 'capitalize-first',
        title: "Capitalize First Letter",
        difficulty: "True Beginner",
        category: "Strings",
        description: "Write a function that capitalizes the first letter of a string.",
        examples: [
            { input: 'capitalize("hello")', output: '"Hello"' },
            { input: 'capitalize("world")', output: '"World"' }
        ],
        constraints: ["String is not empty"],
        starterCode: "function capitalize(str) {\n  // Your code here\n}",
        solution: "function capitalize(str) {\n  return str[0].toUpperCase() + str.slice(1);\n}",
        testCases: [
            { input: ["hello"], expected: "Hello" },
            { input: ["world"], expected: "World" }
        ],
        hints: [
            "You need to make the first letter uppercase and keep the rest of the string the same.",
            "Use .toUpperCase() on the first character and .slice(1) to get the rest of the string.",
            "Pseudocode: 1. Get first char with str[0], 2. Make it uppercase, 3. Add the rest with str.slice(1)"
        ]
    },

    // BEGINNER (5 new)
    'reverse-words': {
        id: 'reverse-words',
        title: "Reverse Words in String",
        difficulty: "Beginner",
        category: "Strings",
        description: "Given a string, reverse the order of words. Words are separated by spaces.",
        examples: [
            { input: 'reverseWords("hello world")', output: '"world hello"' },
            { input: 'reverseWords("the sky is blue")', output: '"blue is sky the"' }
        ],
        constraints: ["Words are separated by single spaces"],
        starterCode: "function reverseWords(str) {\n  // Your code here\n}",
        solution: "function reverseWords(str) {\n  return str.split(' ').reverse().join(' ');\n}",
        testCases: [
            { input: ["hello world"], expected: "world hello" },
            { input: ["the sky is blue"], expected: "blue is sky the" }
        ],
        hints: [
            "Break the string into individual words first. How can you split a string by spaces?",
            "Use .split(' ') to get an array of words, .reverse() to flip the order, and .join(' ') to combine back into a string.",
            "Pseudocode: 1. Split string into words array, 2. Reverse the array, 3. Join back with spaces"
        ]
    },

    'sum-two-arrays': {
        id: 'sum-two-arrays',
        title: "Sum Two Arrays",
        difficulty: "Beginner",
        category: "Arrays",
        description: "Given two arrays of equal length, return a new array where each element is the sum of corresponding elements.",
        examples: [
            { input: "sumArrays([1,2,3], [4,5,6])", output: "[5,7,9]" },
            { input: "sumArrays([1,1], [2,2])", output: "[3,3]" }
        ],
        constraints: ["Both arrays have the same length"],
        starterCode: "function sumArrays(arr1, arr2) {\n  // Your code here\n}",
        solution: "function sumArrays(arr1, arr2) {\n  return arr1.map((num, i) => num + arr2[i]);\n}",
        testCases: [
            { input: [[1, 2, 3], [4, 5, 6]], expected: [5, 7, 9] },
            { input: [[1, 1], [2, 2]], expected: [3, 3] }
        ],
        hints: [
            "You need to go through both arrays at the same time and add corresponding elements.",
            "Use .map() to create a new array, where each element is arr1[i] + arr2[i].",
            "Pseudocode: 1. Loop through indices, 2. For each index i, add arr1[i] + arr2[i], 3. Return new array"
        ]
    },

    'find-longest-word': {
        id: 'find-longest-word',
        title: "Find Longest Word",
        difficulty: "Beginner",
        category: "Strings",
        description: "Given a string of words, return the length of the longest word.",
        examples: [
            { input: 'findLongest("the quick brown fox")', output: "5" },
            { input: 'findLongest("hello world")', output: "5" }
        ],
        constraints: ["Words are separated by spaces"],
        starterCode: "function findLongest(str) {\n  // Your code here\n}",
        solution: "function findLongest(str) {\n  return Math.max(...str.split(' ').map(word => word.length));\n}",
        testCases: [
            { input: ["the quick brown fox"], expected: 5 },
            { input: ["hello world"], expected: 5 }
        ],
        hints: [
            "Split the string into words, then check the length of each word.",
            "Use .split(' ') to get words, then .map() to get lengths, and Math.max() to find the biggest.",
            "Pseudocode: 1. Split into words, 2. Get length of each word, 3. Return maximum length"
        ]
    },

    'remove-duplicates-array': {
        id: 'remove-duplicates-array',
        title: "Remove Duplicates from Array",
        difficulty: "Beginner",
        category: "Arrays",
        description: "Given an array, return a new array with duplicate values removed.",
        examples: [
            { input: "removeDuplicates([1,2,2,3,3,3])", output: "[1,2,3]" },
            { input: "removeDuplicates([1,1,1,1])", output: "[1]" }
        ],
        constraints: ["Return array in original order"],
        starterCode: "function removeDuplicates(arr) {\n  // Your code here\n}",
        solution: "function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}",
        testCases: [
            { input: [[1, 2, 2, 3, 3, 3]], expected: [1, 2, 3] },
            { input: [[1, 1, 1, 1]], expected: [1] }
        ],
        hints: [
            "What data structure automatically removes duplicates? A Set only stores unique values.",
            "Convert the array to a Set to remove duplicates, then convert back to an array.",
            "Pseudocode: 1. Create a Set from the array, 2. Convert Set back to array with [...set]"
        ]
    },

    'is-anagram': {
        id: 'is-anagram',
        title: "Valid Anagram",
        difficulty: "Beginner",
        category: "Strings",
        description: "Given two strings, return true if they are anagrams of each other (contain same letters in different order).",
        examples: [
            { input: 'isAnagram("listen", "silent")', output: "true" },
            { input: 'isAnagram("hello", "world")', output: "false" }
        ],
        constraints: ["Both strings are lowercase"],
        starterCode: "function isAnagram(s, t) {\n  // Your code here\n}",
        solution: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  return s.split('').sort().join('') === t.split('').sort().join('');\n}",
        testCases: [
            { input: ["listen", "silent"], expected: true },
            { input: ["hello", "world"], expected: false }
        ],
        hints: [
            "Anagrams have the same letters in a different order. If you sorted both strings, what would happen?",
            "Split both strings into character arrays, sort them, and compare if they're equal.",
            "Pseudocode: 1. Check if lengths are equal, 2. Sort both strings' characters, 3. Compare sorted strings"
        ]
    },

    // INTERMEDIATE (5 new)
    'find-peak-element': {
        id: 'find-peak-element',
        title: "Find Peak Element",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "A peak element is greater than its neighbors. Find any peak element and return its index.",
        examples: [
            { input: "findPeak([1,2,3,1])", output: "2" },
            { input: "findPeak([1,2,1,3,5,6,4])", output: "5" }
        ],
        constraints: ["Array has at least one element"],
        starterCode: "function findPeak(nums) {\n  // Your code here\n}",
        solution: "function findPeak(nums) {\n  for (let i = 0; i < nums.length; i++) {\n    if ((i === 0 || nums[i] > nums[i-1]) && (i === nums.length-1 || nums[i] > nums[i+1])) {\n      return i;\n    }\n  }\n  return 0;\n}",
        testCases: [
            { input: [[1, 2, 3, 1]], expected: 2 },
            { input: [[1, 2, 1, 3, 5, 6, 4]], expected: 5 }
        ],
        hints: [
            "A peak is bigger than both its neighbors. What about elements at the edges of the array?",
            "Loop through the array and check if each element is greater than its left and right neighbors.",
            "Pseudocode: 1. For each index i, 2. Check if nums[i] > nums[i-1] AND nums[i] > nums[i+1], 3. Handle edge cases for first and last elements"
        ]
    },

    'group-anagrams': {
        id: 'group-anagrams',
        title: "Group Anagrams",
        difficulty: "Intermediate",
        category: "Strings",
        description: "Given an array of strings, group anagrams together.",
        examples: [
            { input: 'groupAnagrams(["eat","tea","tan","ate","nat","bat"])', output: '[["eat","tea","ate"],["tan","nat"],["bat"]]' }
        ],
        constraints: ["All strings are lowercase"],
        starterCode: "function groupAnagrams(strs) {\n  // Your code here\n}",
        solution: "function groupAnagrams(strs) {\n  const map = new Map();\n  for (let str of strs) {\n    const sorted = str.split('').sort().join('');\n    if (!map.has(sorted)) map.set(sorted, []);\n    map.get(sorted).push(str);\n  }\n  return Array.from(map.values());\n}",
        testCases: [
            { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] }
        ],
        hints: [
            "Anagrams will have the same characters when sorted. Can you use sorted strings as keys?",
            "Use a Map where the key is the sorted string and the value is an array of anagrams.",
            "Pseudocode: 1. Create Map, 2. For each word, sort its characters, 3. Use sorted string as key, add word to that group, 4. Return all groups"
        ]
    },

    'kth-largest': {
        id: 'kth-largest',
        title: "Kth Largest Element",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "Find the kth largest element in an unsorted array.",
        examples: [
            { input: "findKthLargest([3,2,1,5,6,4], 2)", output: "5" },
            { input: "findKthLargest([3,2,3,1,2,4,5,5,6], 4)", output: "4" }
        ],
        constraints: ["1 <= k <= array.length"],
        starterCode: "function findKthLargest(nums, k) {\n  // Your code here\n}",
        solution: "function findKthLargest(nums, k) {\n  return nums.sort((a, b) => b - a)[k - 1];\n}",
        testCases: [
            { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
            { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 }
        ],
        hints: [
            "If the array was sorted in descending order, which index would contain the kth largest?",
            "Sort the array in descending order, then return the element at index k-1.",
            "Pseudocode: 1. Sort array in descending order (largest first), 2. Return element at index k-1"
        ]
    },

    'valid-sudoku': {
        id: 'valid-sudoku',
        title: "Valid Sudoku",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "Determine if a 9x9 Sudoku board is valid. Each row, column, and 3x3 box must contain digits 1-9 without repetition.",
        examples: [
            { input: 'Board with valid configuration', output: "true" },
            { input: 'Board with duplicate in row', output: "false" }
        ],
        constraints: ["Board is 9x9", "Empty cells are marked with '.'"],
        starterCode: "function isValidSudoku(board) {\n  // Your code here\n}",
        solution: "function isValidSudoku(board) {\n  const seen = new Set();\n  for (let i = 0; i < 9; i++) {\n    for (let j = 0; j < 9; j++) {\n      const num = board[i][j];\n      if (num !== '.') {\n        const row = `row${i}${num}`;\n        const col = `col${j}${num}`;\n        const box = `box${Math.floor(i/3)}${Math.floor(j/3)}${num}`;\n        if (seen.has(row) || seen.has(col) || seen.has(box)) return false;\n        seen.add(row);\n        seen.add(col);\n        seen.add(box);\n      }\n    }\n  }\n  return true;\n}",
        testCases: [],
        hints: [
            "You need to check three things: no duplicates in rows, columns, and 3x3 boxes.",
            "Use a Set to track seen numbers. Create unique keys for each row, column, and box.",
            "Pseudocode: 1. Create Set for tracking, 2. For each cell, create keys like 'row0-5' for row 0 with digit 5, 3. Check if key exists in Set, 4. Add keys to Set"
        ]
    },

    'container-with-most-water': {
        id: 'container-with-most-water',
        title: "Container With Most Water",
        difficulty: "Intermediate",
        category: "Arrays",
        description: "Given an array of heights, find two lines that together with the x-axis form a container that holds the most water.",
        examples: [
            { input: "maxArea([1,8,6,2,5,4,8,3,7])", output: "49" }
        ],
        constraints: ["At least 2 heights given"],
        starterCode: "function maxArea(height) {\n  // Your code here\n}",
        solution: "function maxArea(height) {\n  let maxWater = 0;\n  let left = 0, right = height.length - 1;\n  while (left < right) {\n    const water = Math.min(height[left], height[right]) * (right - left);\n    maxWater = Math.max(maxWater, water);\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return maxWater;\n}",
        testCases: [
            { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 }
        ],
        hints: [
            "The area is determined by the shorter line and the distance between lines. How can you maximize this?",
            "Use two pointers starting from both ends. Move the pointer with the shorter height inward.",
            "Pseudocode: 1. Set left = 0, right = end, 2. Calculate area = min(height[left], height[right]) * distance, 3. Move the pointer with smaller height, 4. Track maximum area"
        ]
    },

    // ADVANCED (5 new)
    'longest-palindrome-substring': {
        id: 'longest-palindrome-substring',
        title: "Longest Palindromic Substring",
        difficulty: "Advanced",
        category: "Strings",
        description: "Given a string, find the longest palindromic substring.",
        examples: [
            { input: 'longestPalindrome("babad")', output: '"bab" or "aba"' },
            { input: 'longestPalindrome("cbbd")', output: '"bb"' }
        ],
        constraints: ["1 <= s.length <= 1000"],
        starterCode: "function longestPalindrome(s) {\n  // Your code here\n}",
        solution: "function longestPalindrome(s) {\n  if (s.length < 2) return s;\n  let start = 0, maxLen = 0;\n  function expandAroundCenter(left, right) {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      if (right - left + 1 > maxLen) {\n        start = left;\n        maxLen = right - left + 1;\n      }\n      left--;\n      right++;\n    }\n  }\n  for (let i = 0; i < s.length; i++) {\n    expandAroundCenter(i, i);\n    expandAroundCenter(i, i + 1);\n  }\n  return s.substring(start, start + maxLen);\n}",
        testCases: [
            { input: ["babad"], expected: "bab" },
            { input: ["cbbd"], expected: "bb" }
        ],
        hints: [
            "A palindrome reads the same forwards and backwards. Can you expand around each possible center?",
            "For each position, expand outward while characters match. Handle both odd and even length palindromes.",
            "Pseudocode: 1. For each index as center, 2. Expand left and right while s[left] === s[right], 3. Track longest palindrome found, 4. Handle both odd-length (single center) and even-length (two centers)"
        ]
    },

    'decode-ways': {
        id: 'decode-ways',
        title: "Decode Ways",
        difficulty: "Advanced",
        category: "Dynamic Programming",
        description: "A message containing letters A-Z can be encoded to numbers using 'A'=1, 'B'=2, ..., 'Z'=26. Given a string of digits, count the number of ways to decode it.",
        examples: [
            { input: 'numDecodings("12")', output: "2", explanation: "Can be 'AB' (1,2) or 'L' (12)" },
            { input: 'numDecodings("226")', output: "3", explanation: "'BZ' (2,26), 'VF' (22,6), 'BBF' (2,2,6)" }
        ],
        constraints: ["String contains only digits"],
        starterCode: "function numDecodings(s) {\n  // Your code here\n}",
        solution: "function numDecodings(s) {\n  if (s[0] === '0') return 0;\n  const dp = new Array(s.length + 1).fill(0);\n  dp[0] = 1;\n  dp[1] = 1;\n  for (let i = 2; i <= s.length; i++) {\n    const one = parseInt(s.slice(i-1, i));\n    const two = parseInt(s.slice(i-2, i));\n    if (one >= 1) dp[i] += dp[i-1];\n    if (two >= 10 && two <= 26) dp[i] += dp[i-2];\n  }\n  return dp[s.length];\n}",
        testCases: [
            { input: ["12"], expected: 2 },
            { input: ["226"], expected: 3 }
        ],
        hints: [
            "At each position, you can decode 1 digit or 2 digits (if valid). How many ways can you decode up to that point?",
            "Use dynamic programming. dp[i] = ways to decode first i characters. Consider single digit and two-digit decodings.",
            "Pseudocode: 1. dp[0] = 1 (empty string), dp[1] = 1, 2. For each position i, if single digit is valid (1-9), add dp[i-1], 3. If two digits form valid number (10-26), add dp[i-2]"
        ]
    },

    'permutations': {
        id: 'permutations',
        title: "Permutations",
        difficulty: "Advanced",
        category: "Backtracking",
        description: "Given an array of distinct integers, return all possible permutations.",
        examples: [
            { input: "permute([1,2,3])", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
        ],
        constraints: ["All integers are distinct"],
        starterCode: "function permute(nums) {\n  // Your code here\n}",
        solution: "function permute(nums) {\n  const result = [];\n  function backtrack(current, remaining) {\n    if (remaining.length === 0) {\n      result.push([...current]);\n      return;\n    }\n    for (let i = 0; i < remaining.length; i++) {\n      current.push(remaining[i]);\n      backtrack(current, remaining.slice(0, i).concat(remaining.slice(i + 1)));\n      current.pop();\n    }\n  }\n  backtrack([], nums);\n  return result;\n}",
        testCases: [
            { input: [[1, 2, 3]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] }
        ],
        hints: [
            "Use backtracking. For each position, try placing each unused number there.",
            "Build permutations recursively: pick an element, permute the rest, then backtrack.",
            "Pseudocode: 1. Base case: if no remaining numbers, add current permutation to results, 2. For each remaining number, add it to current, recurse with remaining numbers, remove it (backtrack)"
        ]
    },

    'minimum-window-substring': {
        id: 'minimum-window-substring',
        title: "Minimum Window Substring",
        difficulty: "Advanced",
        category: "Strings",
        description: "Given strings s and t, find the minimum window in s which contains all characters of t.",
        examples: [
            { input: 'minWindow("ADOBECODEBANC", "ABC")', output: '"BANC"' }
        ],
        constraints: ["If no window exists, return empty string"],
        starterCode: "function minWindow(s, t) {\n  // Your code here\n}",
        solution: "function minWindow(s, t) {\n  const need = new Map();\n  for (let char of t) need.set(char, (need.get(char) || 0) + 1);\n  let left = 0, right = 0, formed = 0, minLen = Infinity, minStart = 0;\n  const window = new Map();\n  while (right < s.length) {\n    const char = s[right];\n    window.set(char, (window.get(char) || 0) + 1);\n    if (need.has(char) && window.get(char) === need.get(char)) formed++;\n    while (formed === need.size) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1;\n        minStart = left;\n      }\n      const leftChar = s[left];\n      window.set(leftChar, window.get(leftChar) - 1);\n      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) formed--;\n      left++;\n    }\n    right++;\n  }\n  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);\n}",
        testCases: [
            { input: ["ADOBECODEBANC", "ABC"], expected: "BANC" }
        ],
        hints: [
            "Use a sliding window approach. Expand the window until it contains all characters of t, then shrink from left.",
            "Keep track of character counts in both the target and current window using Maps.",
            "Pseudocode: 1. Create frequency map for t, 2. Use two pointers (left, right), 3. Expand right until window is valid, 4. Shrink left to minimize window, 5. Track minimum window found"
        ]
    },

    'edit-distance': {
        id: 'edit-distance',
        title: "Edit Distance",
        difficulty: "Advanced",
        category: "Dynamic Programming",
        description: "Given two strings, find the minimum number of operations (insert, delete, replace) to convert one to the other.",
        examples: [
            { input: 'minDistance("horse", "ros")', output: "3", explanation: "horse -> rorse -> rose -> ros" }
        ],
        constraints: ["0 <= word length <= 500"],
        starterCode: "function minDistance(word1, word2) {\n  // Your code here\n}",
        solution: "function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i-1] === word2[j-1]) {\n        dp[i][j] = dp[i-1][j-1];\n      } else {\n        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;\n      }\n    }\n  }\n  return dp[m][n];\n}",
        testCases: [
            { input: ["horse", "ros"], expected: 3 }
        ],
        hints: [
            "Use 2D dynamic programming. dp[i][j] = min operations to convert first i chars of word1 to first j chars of word2.",
            "If characters match, no operation needed. Otherwise, consider insert, delete, or replace.",
            "Pseudocode: 1. Create 2D DP table, 2. Base cases: dp[i][0] = i, dp[0][j] = j, 3. If chars match: dp[i][j] = dp[i-1][j-1], 4. Else: dp[i][j] = 1 + min(insert, delete, replace)"
        ]
    }
};