import Planner from './domain/PlannerStart';

class App {
  async run() {
    const eventPlanner = new Planner();
    await eventPlanner.start();
  }
}

export default App;
