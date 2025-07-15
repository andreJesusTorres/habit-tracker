# Tests Documentation

## Overview

This directory contains all test files for the API. The tests are organized using Mocha and Chai for assertions.

## Structure

```
test/
├── factories.js      # Test data factories
├── helpers.js        # Common test utilities
└── README.md         # This file

logic/
├── users/
│   ├── registerUser.test.js
│   ├── authenticateUser.test.js
│   └── getUserName.test.js
├── habits/
│   ├── addHabit.test.js
│   ├── deleteHabit.test.js
│   ├── getHabits.test.js
│   ├── trackHabitProgress.test.js
│   └── updateHabit.test.js
├── events/
│   ├── addEvent.test.js
│   ├── deleteEvent.test.js
│   ├── getEvents.test.js
│   └── updateEvent.test.js
├── goals/
│   ├── addGoal.test.js
│   ├── deleteGoal.test.js
│   ├── getGoals.test.js
│   └── updateGoal.test.js
└── progress/
    ├── addProgress.test.js
    ├── deleteProgress.test.js
    ├── getProgress.test.js
    └── updateProgress.test.js
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### With Coverage
```bash
npm run test:coverage
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

## Test Patterns

### 1. Test Structure
Each test file follows this pattern:
```javascript
import 'dotenv/config';
import { expect } from 'chai';
import db, { User, Habit } from 'dat';
import functionToTest from './functionToTest.js';

describe('functionToTest', () => {
    let testUser, testHabit;

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        // Clean up and create test data
    });

    after(async () => {
        await db.disconnect();
    });

    it('should do something successfully', async () => {
        // Test implementation
    });
});
```

### 2. Using Factories
```javascript
import { createTestUser, createTestHabit } from '../../test/factories.js';

const user = createTestUser({ email: 'custom@example.com' });
const habit = createTestHabit(user._id, { name: 'Custom Habit' });
```

### 3. Error Testing
```javascript
try {
    await functionToTest(invalidData);
    throw new Error('Should have failed');
} catch (error) {
    expect(error.message).to.include('expected error message');
}
```

## Best Practices

1. **Always clean up**: Use `beforeEach` to clear collections
2. **Use factories**: Don't hardcode test data
3. **Test both success and failure cases**
4. **Use descriptive test names**
5. **Test edge cases and validation**
6. **Keep tests independent**: Each test should be able to run alone

## Environment Variables

Make sure you have these environment variables set:
- `MONGO_URL_TEST`: Test database connection string

## Coverage

The test coverage includes:
- ✅ Unit tests for all business logic functions
- ✅ Integration tests for database operations
- ✅ Error handling and validation
- ✅ Edge cases and boundary conditions

## Adding New Tests

1. Create the test file in the appropriate directory
2. Follow the naming convention: `functionName.test.js`
3. Use the established patterns and helpers
4. Add both success and failure test cases
5. Update this README if needed 