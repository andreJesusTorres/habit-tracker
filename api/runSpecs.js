import 'dotenv/config';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Lista de archivos spec organizados por módulo (COBERTURA COMPLETA)
const specs = {
    users: [
        'logic/users/registerUser.spec.js',
        'logic/users/authenticateUser.spec.js',
        'logic/users/updateUser.spec.js',
        'logic/users/getUserDetails.spec.js',
        'logic/users/getUserName.spec.js'
    ],
    habits: [
        'logic/habits/addHabit.spec.js',
        'logic/habits/getHabits.spec.js',
        'logic/habits/updateHabit.spec.js',
        'logic/habits/deleteHabit.spec.js',
        'logic/habits/trackHabitProgress.spec.js'
    ],
    goals: [
        'logic/goals/addGoal.spec.js',
        'logic/goals/getGoals.spec.js',
        'logic/goals/updateGoal.spec.js',
        'logic/goals/deleteGoal.spec.js'
    ],
    events: [
        'logic/events/addEvent.spec.js',
        'logic/events/getEvents.spec.js',
        'logic/events/updateEvent.spec.js',
        'logic/events/deleteEvent.spec.js'
    ],
    progress: [
        'logic/progress/addProgress.spec.js',
        'logic/progress/getProgress.spec.js',
        'logic/progress/updateProgress.spec.js',
        'logic/progress/deleteProgress.spec.js'
    ]
};

// Función para ejecutar un spec individual
async function runSpec(specPath) {
    try {
        console.log(`\nEjecutando: ${specPath}`);
        const { stdout, stderr } = await execAsync(`node ${specPath}`);
        
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
        
        return { success: true, spec: specPath };
    } catch (error) {
        console.error(`Error en ${specPath}:`, error.message);
        return { success: false, spec: specPath, error: error.message };
    }
}

// Función para ejecutar todos los specs de un módulo
async function runModuleSpecs(moduleName, specList) {
    console.log(`\n=== MÓDULO: ${moduleName.toUpperCase()} ===`);
    
    const results = [];
    for (const spec of specList) {
        const result = await runSpec(spec);
        results.push(result);
    }
    
    return results;
}

// Función principal
async function runAllSpecs() {
    console.log('INICIANDO EJECUCIÓN DE TODOS LOS SPECS');
    console.log('==========================================');
    
    const allResults = {};
    let totalSpecs = 0;
    let passedSpecs = 0;
    let failedSpecs = 0;
    
    // Ejecutar specs por módulo
    for (const [moduleName, specList] of Object.entries(specs)) {
        const moduleResults = await runModuleSpecs(moduleName, specList);
        allResults[moduleName] = moduleResults;
        
        const modulePassed = moduleResults.filter(r => r.success).length;
        const moduleFailed = moduleResults.filter(r => !r.success).length;
        
        totalSpecs += specList.length;
        passedSpecs += modulePassed;
        failedSpecs += moduleFailed;
        
        console.log(`\n${moduleName.toUpperCase()}: ${modulePassed}/${specList.length} specs pasaron`);
    }
    
    // Mostrar resumen final
    console.log('\n' + '='.repeat(50));
    console.log('RESUMEN FINAL');
    console.log('='.repeat(50));
    console.log(`Specs pasados: ${passedSpecs}`);
    console.log(`Specs fallidos: ${failedSpecs}`);
    console.log(`Total de specs: ${totalSpecs}`);
    console.log(`Porcentaje de éxito: ${((passedSpecs / totalSpecs) * 100).toFixed(1)}%`);
    
    console.log('\nEjecución completada!');
}

// Ejecutar la función principal
runAllSpecs().catch(error => {
    console.error('Error fatal:', error);
    process.exit(1);
}); 