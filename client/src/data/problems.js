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
        hints: [
            "Use the return keyword",
            "Strings are wrapped in quotes",
            "return 'Hello, World!';"
        ],
        testCases: [
            { input: [], output: "Hello, World!" }
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
        hints: [
            "Use the + operator",
            "Return the result of a + b",
            "return a + b;"
        ],
        testCases: [
            { input: [2, 3], output: 5 },
            { input: [10, -5], output: 5 }
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
        hints: [
            "Even numbers are divisible by 2",
            "Use num % 2 to check remainder",
            "If remainder is 0, number is even"
        ],
        testCases: [
            { input: [4], output: true },
            { input: [7], output: false }
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
        hints: [
            "Use an if statement or ternary operator",
            "Compare a and b",
            "return a > b ? a : b;"
        ],
        testCases: [
            { input: [5, 10], output: 10 },
            { input: [-3, -8], output: -3 }
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
        hints: [
            "Create a string of vowels: 'aeiouAEIOU'",
            "Loop through each character",
            "Check if character is in vowels string"
        ],
        testCases: [
            { input: ["hello"], output: 2 },
            { input: ["sky"], output: 0 }
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
        hints: [
            "Use a hash map to store numbers you've seen",
            "For each number, check if target - number exists in the map",
            "Store the index along with the number"
        ],
        testCases: [
            { input: [[2, 7, 11, 15], 9], output: [0, 1] },
            { input: [[3, 2, 4], 6], output: [1, 2] }
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
        hints: [
            "Use a stack data structure",
            "Push opening brackets onto the stack",
            "When you see a closing bracket, check if it matches the top of the stack"
        ],
        testCases: [
            { input: ["()"], output: true },
            { input: ["()[]{}"], output: true },
            { input: ["(]"], output: false }
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
        hints: [
            "Use two pointers, one at start and one at end",
            "Swap characters and move pointers inward",
            "Stop when pointers meet"
        ],
        testCases: [
            { input: [["h", "e", "l", "l", "o"]], output: ["o", "l", "l", "e", "h"] }
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
        hints: [
            "Check divisibility by 15 first (both 3 and 5)",
            "Then check 3, then 5",
            "Use modulo operator %"
        ],
        testCases: [
            { input: [5], output: ["1", "2", "Fizz", "4", "Buzz"] }
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
        hints: [
            "Negative numbers can't be palindromes",
            "Convert to string",
            "Check if string equals its reverse"
        ],
        testCases: [
            { input: [121], output: true },
            { input: [-121], output: false }
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
        hints: [
            "Use a Set to track numbers you've seen",
            "If you see a number that's already in the set, return true",
            "If you finish the loop, return false"
        ],
        testCases: [
            { input: [[1, 2, 3, 1]], output: true },
            { input: [[1, 2, 3, 4]], output: false }
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
        hints: [
            "Calculate the sum of numbers from 0 to n",
            "Calculate the sum of the array",
            "The difference is the missing number"
        ],
        testCases: [
            { input: [[3, 0, 1]], output: 2 },
            { input: [[0, 1]], output: 2 }
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
        hints: [
            "Use XOR operation (^)",
            "XOR of two same numbers is 0",
            "XOR of a number with 0 is the number itself"
        ],
        testCases: [
            { input: [[2, 2, 1]], output: 1 },
            { input: [[4, 1, 2, 1, 2]], output: 4 }
        ]
    },

    // ==================== INTERMEDIATE (10) ====================
    'merge-sorted-lists': {
        id: 'merge-sorted-lists',
        title: "Merge Two Sorted Lists",
        difficulty: "Intermediate",
        category: "Linked List",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
        examples: [
            {
                input: "list1 = [1,2,4], list2 = [1,3,4]",
                output: "[1,1,2,3,4,4]"
            }
        ],
        constraints: [
            "Both lists are sorted in non-decreasing order"
        ],
        starterCode: "function mergeTwoLists(list1, list2) {\n  // Your code here\n}",
        solution: "function mergeTwoLists(list1, list2) {\n  if (!list1) return list2;\n  if (!list2) return list1;\n  if (list1.val < list2.val) {\n    list1.next = mergeTwoLists(list1.next, list2);\n    return list1;\n  } else {\n    list2.next = mergeTwoLists(list1, list2.next);\n    return list2;\n  }\n}",
        hints: [
            "Use recursion or iteration",
            "Compare heads of both lists",
            "Attach smaller node and move forward"
        ],
        testCases: []
    },

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
        hints: [
            "Use two pointers: left and right",
            "Calculate middle index",
            "Compare middle element with target and adjust pointers"
        ],
        testCases: [
            { input: [[-1, 0, 3, 5, 9, 12], 9], output: 4 },
            { input: [[-1, 0, 3, 5, 9, 12], 2], output: -1 }
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
        hints: [
            "Use Kadane's algorithm",
            "At each position, decide: start new subarray or extend current?",
            "Track both current sum and max sum"
        ],
        testCases: [
            { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], output: 6 }
        ]
    },

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
        hints: [
            "This is a Fibonacci sequence!",
            "ways(n) = ways(n-1) + ways(n-2)",
            "Use dynamic programming to avoid recalculation"
        ],
        testCases: [
            { input: [2], output: 2 },
            { input: [3], output: 3 }
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
        hints: [
            "Track the minimum price seen so far",
            "Calculate profit if selling today",
            "Keep track of maximum profit"
        ],
        testCases: [
            { input: [[7, 1, 5, 3, 6, 4]], output: 5 }
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
        hints: [
            "Use the reversal algorithm",
            "Reverse entire array, then reverse first k, then reverse rest",
            "Handle k > array length with modulo"
        ],
        testCases: [
            { input: [[1, 2, 3, 4, 5, 6, 7], 3], output: [5, 6, 7, 1, 2, 3, 4] }
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
        hints: [
            "Calculate prefix products (left to right)",
            "Calculate suffix products (right to left)",
            "Combine them without using division"
        ],
        testCases: [
            { input: [[1, 2, 3, 4]], output: [24, 12, 8, 6] }
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
        hints: [
            "Use sliding window technique",
            "Track characters with a Map",
            "When you find a duplicate, move start pointer"
        ],
        testCases: [
            { input: ["abcabcbb"], output: 3 },
            { input: ["bbbbb"], output: 1 }
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
        hints: [
            "Sort intervals by start time",
            "Compare current interval with last merged interval",
            "Merge if they overlap"
        ],
        testCases: [
            { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], output: [[1, 6], [8, 10], [15, 18]] }
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
        hints: [
            "Use recursion",
            "Swap left and right children",
            "Recursively invert left and right subtrees"
        ],
        testCases: []
    },

    // ==================== ADVANCED (7) ====================
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
        hints: [
            "Use dynamic programming",
            "dp[i] = can we break s[0...i]?",
            "Check all possible last words"
        ],
        testCases: [
            { input: ["leetcode", ["leet", "code"]], output: true }
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
        hints: [
            "Use DP: dp[i] = min coins for amount i",
            "For each amount, try each coin",
            "Take minimum of all options"
        ],
        testCases: [
            { input: [[1, 2, 5], 11], output: 3 }
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
        hints: [
            "Use a Map (maintains insertion order)",
            "On get, delete and re-insert to mark as recent",
            "On put, if over capacity, remove oldest (first) entry"
        ],
        testCases: []
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
        hints: [
            "Use two pointers from both ends",
            "Track max height from left and right",
            "Water at position = min(leftMax, rightMax) - height"
        ],
        testCases: [
            { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], output: 6 }
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
        hints: [
            "Use preorder traversal for serialization",
            "Use recursion to rebuild tree",
            "Handle null nodes explicitly"
        ],
        testCases: []
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
        hints: [
            "Maintain a sorted array",
            "Use binary search for insertion",
            "Median is middle element(s)"
        ],
        testCases: []
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
        hints: [
            "Use 2D DP table",
            "dp[i][j] = does s[0..i] match p[0..j]?",
            "Handle '.' and '*' as special cases"
        ],
        testCases: [
            { input: ["aa", "a"], output: false },
            { input: ["aa", "a*"], output: true }
        ]
    }
}
