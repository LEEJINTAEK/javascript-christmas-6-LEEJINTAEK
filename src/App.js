import PlannerStart from './domain/PlannerStart.js';

class App {
  async run() {
    const eventPlanner = new PlannerStart();
    await eventPlanner.start();
  }
}

export default App;
