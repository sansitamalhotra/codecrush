// Local code execution for test cases
export const runTestCases = (code, testCases, language = 'javascript') => {
    const results = []

    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i]
        try {
            let output

            if (language === 'javascript') {
                // Extract function name from code
                const functionMatch = code.match(/function\s+(\w+)/)
                if (!functionMatch) {
                    throw new Error('No function found in code')
                }
                const functionName = functionMatch[1]

                // Create a function that returns the user's function
                // This wraps the code and returns the function object
                const wrappedCode = `
                    ${code}
                    return ${functionName};
                `

                // Execute and get the function
                const fn = new Function(wrappedCode)()

                // Run test case
                output = fn(...testCase.input)
            }

            // Check if output matches expected
            const passed = JSON.stringify(output) === JSON.stringify(testCase.expected)

            results.push({
                passed,
                input: testCase.input,
                expected: testCase.expected,
                actual: output,
                testNumber: i + 1
            })
        } catch (error) {
            results.push({
                passed: false,
                input: testCase.input,
                expected: testCase.expected,
                actual: null,
                error: error.message,
                testNumber: i + 1
            })
        }
    }

    return results
}

export const formatTestResult = (result) => {
    if (result.passed) {
        return {
            status: 'passed',
            message: `✅ Test ${result.testNumber} passed!`,
            input: result.input,
            expected: result.expected,
            actual: result.actual
        }
    } else {
        return {
            status: 'failed',
            message: `❌ Test ${result.testNumber} failed`,
            input: result.input,
            expected: result.expected,
            actual: result.actual || 'Error',
            error: result.error
        }
    }
}