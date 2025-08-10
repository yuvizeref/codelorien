import User from "../models/userModel.js";
import { addProblem, deleteAllProblems } from "./problemUtils.js";
import { addTestCases } from "./testCasesUtils.js";

export const problemNames = [
  "Two Sum",
  "Search Insert Position",
  "Valid Parentheses",
  "Jump Game",
  "Edit Distance",
  "Word Search",
  "Permutation Sequence",
  "N Queens",
  "Median of Two Sorted Arrays",
];

export const problemDescriptions = [
  `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Input Format:
First line contains the number of test cases t.
Each test case contains 2 lines:
1. Size of the array <space> target.
2. Array elements.

Output Format:
Print the space separated indices in new lines.

Example 1:

Input: 
1
4 9
2 7 11 15

Output:
0 1
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input:
1
3 6
3 2 4

Output:
1 2

Example 3:

Input:
1
2 6
3 3

Output:
0 1

 

Constraints:

    2 <= nums.length <= 104
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    Only one valid answer exists.

 
Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?`,

  `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

Input Format:
First line contains the number of test cases t.
Each test case contains 2 lines:
1. Size of the array <space> target.
2. Array elements.

Output Format:
Print the space separated indices in new lines.

Example 1:

Input: 
1
4 5
1 3 5 6
Output: 2

Example 2:

Input:
1
4 2
1 3 5 6
Output: 1

Example 3:

Input:
1
4 7
1 3 5 6
Output: 4

 

Constraints:

    1 <= nums.length <= 10^4
    -10^4 <= nums[i] <= 10^4
    nums contains distinct values sorted in ascending order.
    -10^4 <= target <= 10^4`,
  `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Input Format:
First line contains the number of test cases t.
Consecutive t lines contains a string s each

Output Format:
Print yes or no in new lines.

Example 1:

Input:
1
()

Output: yes

Example 2:

Input:
1
()[]{}

Output: yes

Example 3:

Input:
1
(]

Output: no

Example 4:

Input:
1
([])

Output: yes

Example 5:

Input:
1
([)]

Output: no

 

Constraints:

    1 <= s.length <= 10^4
    s consists of parentheses only '()[]{}'.`,
  `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Print yes if you can reach the last index, or no otherwise.

Example 1:

Input: 
1
5
2 3 1 1 4
Output: yes
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:

Input:
1
5
3 2 1 0 4
Output: no
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

 

Constraints:

    1 <= nums.length <= 10^4
    0 <= nums[i] <= 10^5`,
  `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
1. Insert a character
2. Delete a character
3. Replace a character

Example 1:

Input: 
1
horse ros
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Example 2:

Input: 
1
intention execution
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

 

Constraints:

    0 <= word1.length, word2.length <= 500
    word1 and word2 consist of lowercase English letters.`,
  `Given an m x n grid of characters board and a string word, Print yes if word exists in the grid, else print no.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:

Input:
1
3 4
A B C E
S F C S
A D E E
ABCCED
Output: yes

Example 2:

Input:
1
3 4
A B C E
S F C S
A D E E
SEE

Output: yes

Example 3:

Input:
1
3 4
A B C E
S F C S
A D E E
ABCB

Output: no

Constraints:

    m == board.length
    n = board[i].length
    1 <= m, n <= 6
    1 <= word.length <= 15
    board and word consists of only lowercase and uppercase English letters.

 

Follow up: Could you use search pruning to make your solution faster with a larger board?`,
  `The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

    "123"
    "132"
    "213"
    "231"
    "312"
    "321"

Given n and k, return the kth permutation sequence.

Example 1:

Input:
1
3 3
Output: 213

Example 2:

Input:
1
4 9
Output: 2314

Example 3:

Input:
1
3 1
Output: 123

 

Constraints:

    1 <= n <= 9
    1 <= k <= n!`,
  `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Example:
Input: 
2
4
1
Output:
2
1

Constraints:

    1 <= n <= 9`,
  `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Input Format:
First line contains the number of test cases t.
Each test case contains 3 lines:
1. Size of the array 1 <space> Size of the array 1.
2. Array 1 elements.
3. Array 2 elements.

Output Format:
Print the space separated indices in new lines.

Example:

Input: 
2
2 1
1 3
2
2 2
1 2
3 4

Output: 
2.00000
2.50000
Explanation: 
1. merged array = [1,2,3] and median is 2.
2. merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.


Constraints:

    nums1.length == m
    nums2.length == n
    0 <= m <= 1000
    0 <= n <= 1000
    1 <= m + n <= 2000
    -10^6 <= nums1[i], nums2[i] <= 10^6`,
];

export const difficulties = [
  "Easy",
  "Easy",
  "Easy",
  "Medium",
  "Medium",
  "Medium",
  "Hard",
  "Hard",
  "Hard",
];

export const inputs = [
  `3
4 9
2 7 11 15
3 6
3 2 4
2 6
3 3`,
  `3
4 5
1 3 5 6
4 2
1 3 5 6
4 7
1 3 5 6`,
  `5
()
()[]{}
(]
([])
([)]`,
  `2
5
2 3 1 1 4
5
3 2 1 0 4`,
  `5
horse ros
intention execution
azertyqsdfghqwerty azertyjklmqwerty
aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaav
aaayuio hjklaaa`,
  `3
3 4
A B C E
S F C S
A D E E
ABCCED
3 4
A B C E
S F C S
A D E E
SEE
3 4
A B C E
S F C S
A D E E
ABCB`,
  `4
3 3
4 9
3 1
5 17
8 36`,
  `9
1
2
3
4
5
6
7
8
9`,
  `2
2 1
1 3
2
2 2
1 2
3 4`,
];

export const outputs = [
  `0 1
1 2
0 1`,
  `2
1
4`,
  `yes
yes
no
yes
no`,
  `yes
no`,
  `3
5
6
8
7`,
  `yes
yes
no`,
  `213
2314
123
14523
12356874`,
  `1
0
0
2
10
4
40
92
352`,
  `2.00000
2.50000`,
];

export const cleanUp = async () => {
  await deleteAllProblems();
};

export const createProblems = async () => {
  const admin = await User.findOne({ username: "admin" });

  const problems = ["", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < 9; i++) {
    const problem = await addProblem(
      {
        name: problemNames[i],
        description: problemDescriptions[i],
        difficulty: difficulties[i],
      },
      admin._id
    );

    problems[i] = problem._id;
  }

  for (let i = 0; i < 9; i++) {
    await addTestCases(inputs[i], outputs[i], 1, problems[i], admin._id);
  }
};
