// AI-powered hints with fallback to static hints

const FALLBACK_HINTS = {
    1: "Think about what data structure would help you track elements you've seen before. What's a good way to check if something exists?",
    2: "Consider using a hash table or Set. These data structures offer O(1) lookup time, which is perfect for checking if an element exists.",
    3: "Pseudocode:\n1. Create an empty Set to track seen numbers\n2. Loop through each element\n3. If element is in Set, you found the answer\n4. If not, add it to the Set\n5. Continue until you find the duplicate"
}

const FALLBACK_REVIEW = `**Code Review:**
Your solution works! The logic is clear and easy to follow. Consider adding comments for complex sections.

**Time Complexity:** O(n) - You iterate through the array once.

**Space Complexity:** O(n) - In the worst case, you store n/2 elements.

**Optimization:** If using a Set approach, you could exit early once you find the answer instead of continuing the loop.`

export const getAIHint = async (problem, hintLevel, userCode = '') => {
    console.log('🔑 Making AI hint request...')

    const hintPrompts = {
        1: `I'm working on this coding problem: "${problem.title}"

Problem Description:
${problem.description}

Examples:
${problem.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}`).join('\n\n')}

Give me a gentle hint to point me in the right direction. Don't give away the solution, just help me think about the approach. Keep it under 2 sentences.`,

        2: `I'm working on this coding problem: "${problem.title}"

Problem Description:
${problem.description}

Examples:
${problem.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}`).join('\n\n')}

${userCode ? `Here's my current code:\n\`\`\`javascript\n${userCode}\n\`\`\`` : ''}

I need more help. Can you tell me what algorithm or approach I should use? Give me the name of the technique/pattern and a brief explanation why it works here. Keep it under 3 sentences.`,

        3: `I'm working on this coding problem: "${problem.title}"

Problem Description:
${problem.description}

Examples:
${problem.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}`).join('\n\n')}

${userCode ? `Here's my current code:\n\`\`\`javascript\n${userCode}\n\`\`\`` : ''}

I'm really stuck. Can you provide pseudocode showing the step-by-step logic? Don't write actual JavaScript code, just the algorithmic steps in plain English.`
    }

    try {
        const response = await fetch('http://localhost:3001/api/hint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: hintPrompts[hintLevel]
                    }
                ],
                max_tokens: 500
            })
        })

        const data = await response.json()
        console.log('📦 API response:', data)

        // Check for errors (like insufficient quota)
        if (data.error) {
            console.warn('⚠️ API Error, using fallback hint:', data.error.message)
            return FALLBACK_HINTS[hintLevel]
        }

        // OpenAI response format
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content
        } else {
            console.warn('⚠️ Unexpected format, using fallback hint')
            return FALLBACK_HINTS[hintLevel]
        }
    } catch (error) {
        console.error('💥 API Hint Error, using fallback:', error)
        return FALLBACK_HINTS[hintLevel]
    }
}

export const getAICodeReview = async (problem, userCode, testResults) => {
    console.log('🔑 Making AI code review request...')

    const allPassed = testResults.every(r => r.passed)

    const prompt = `I just solved this coding problem: "${problem.title}"

Problem Description:
${problem.description}

My solution:
\`\`\`javascript
${userCode}
\`\`\`

Test Results: ${allPassed ? 'All tests passed! ✅' : 'Some tests failed ❌'}

Please provide:
1. Code review (2-3 sentences on code quality)
2. Time complexity analysis
3. Space complexity analysis
4. One optimization suggestion (if any)

Keep it concise and educational. I'm learning!`

    try {
        const response = await fetch('http://localhost:3001/api/hint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 800
            })
        })

        const data = await response.json()
        console.log('📦 API response:', data)

        // Check for errors
        if (data.error) {
            console.warn('⚠️ API Error, using fallback review:', data.error.message)
            return FALLBACK_REVIEW
        }

        // OpenAI response format
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content
        } else {
            console.warn('⚠️ Unexpected format, using fallback review')
            return FALLBACK_REVIEW
        }
    } catch (error) {
        console.error('💥 AI Code Review Error, using fallback:', error)
        return FALLBACK_REVIEW
    }
}