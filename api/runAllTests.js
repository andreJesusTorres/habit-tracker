import 'dotenv/config';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Lista de todos los tests organizados por módulo
const tests = {
    users: [
        'logic/users/registerUser.test.js',
        'logic/users/authenticateUser.test.js'
    ],
    habits: [
        'logic/habits/addHabit.test.js',
        'logic/habits/getHabits.test.js',
        'logic/habits/updateHabit.test.js',
        'logic/habits/deleteHabit.test.js',
        'logic/habits/trackHabitProgress.test.js'
    ],
    goals: [
        'logic/goals/addGoal.test.js',
        'logic/goals/getGoals.test.js',
        'logic/goals/updateGoal.test.js',
        'logic/goals/deleteGoal.test.js'
    ],
    events: [
        'logic/events/addEvent.test.js',
        'logic/events/getEvents.test.js',
        'logic/events/updateEvent.test.js',
        'logic/events/deleteEvent.test.js'
    ],
    progress: [
        'logic/progress/addProgress.test.js',
        'logic/progress/getProgress.test.js',
        'logic/progress/updateProgress.test.js',
        'logic/progress/deleteProgress.test.js'
    ]
};

// Función para ejecutar un test individual
async function runTest(testPath) {
    try {
        console.log(`\n🔄 Ejecutando: ${testPath}`);
        const { stdout, stderr } = await execAsync(`node ${testPath}`);
        
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
        
        return { success: true, test: testPath };
    } catch (error) {
        console.error(`❌ Error en ${testPath}:`, error.message);
        return { success: false, test: testPath, error: error.message };
    }
}

// Función para ejecutar todos los tests de un módulo
async function runModuleTests(moduleName, testList) {
    console.log(`\n📁 === MÓDULO: ${moduleName.toUpperCase()} ===`);
    
    const results = [];
    for (const test of testList) {
        const result = await runTest(test);
        results.push(result);
    }
    
    return results;
}

// Función principal
async function runAllTests() {
    console.log('🚀 INICIANDO EJECUCIÓN DE TODOS LOS TESTS');
    console.log('==========================================');
    
    // Limpiar base de datos de test antes de empezar
    try {
        console.log('\n🧹 Limpiando base de datos de test...');
        await execAsync('node logic/cleanTestDb.js');
        console.log('✅ Base de datos limpiada');
    } catch (error) {
        console.error('❌ Error limpiando base de datos:', error.message);
    }
    
    const allResults = {};
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    
    // Ejecutar tests por módulo
    for (const [moduleName, testList] of Object.entries(tests)) {
        const moduleResults = await runModuleTests(moduleName, testList);
        allResults[moduleName] = moduleResults;
        
        const modulePassed = moduleResults.filter(r => r.success).length;
        const moduleFailed = moduleResults.filter(r => !r.success).length;
        
        totalTests += testList.length;
        passedTests += modulePassed;
        failedTests += moduleFailed;
        
        console.log(`\n📊 ${moduleName.toUpperCase()}: ${modulePassed}/${testList.length} tests pasaron`);
    }
    
    // Mostrar resumen final
    console.log('\n' + '='.repeat(50));
    console.log('📈 RESUMEN FINAL');
    console.log('='.repeat(50));
    console.log(`✅ Tests pasados: ${passedTests}`);
    console.log(`❌ Tests fallidos: ${failedTests}`);
    console.log(`📊 Total de tests: ${totalTests}`);
    console.log(`📈 Porcentaje de éxito: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    // Mostrar detalles de tests fallidos
    if (failedTests > 0) {
        console.log('\n❌ TESTS FALLIDOS:');
        for (const [moduleName, results] of Object.entries(allResults)) {
            const failed = results.filter(r => !r.success);
            if (failed.length > 0) {
                console.log(`\n  ${moduleName.toUpperCase()}:`);
                failed.forEach(f => {
                    console.log(`    - ${f.test}: ${f.error}`);
                });
            }
        }
    }
    
    console.log('\n🎉 Ejecución completada!');
    
    // Retornar código de salida apropiado
    process.exit(failedTests > 0 ? 1 : 0);
}

// Ejecutar la función principal
runAllTests().catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
}); 