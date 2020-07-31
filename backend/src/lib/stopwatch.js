/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

class Stopwatch {
  start() {
    this.startTime = new Date();
    this.hrstart = process.hrtime();
    this.startMemory = process.memoryUsage();
  }

  stop() {
    this.endTime = new Date();
    this.hrend = process.hrtime(this.hrstart);
    this.endMemory = process.memoryUsage();
  }

  _getMemory(memory) {
    const used = memory / 1024 / 1024;
    return Math.round(used * 100) / 100;
  }

  summaryMemory(memory) {
    for (const key in memory) {
      console.info(`Memory ${key}: ${this._getMemory(memory[key])} MB`);
    }
  }

  summary() {
    console.info();
    console.info('Stopwatch Summary');
    console.info(`Started in ${this.startTime}`);
    console.info(`HR started in ${this.hrstart}`);
    this.summaryMemory(this.startMemory);
    console.info();

    console.info(`Ended in ${this.endTime}`);
    console.info(`HR ended in ${this.hrend}`);
    this.summaryMemory(this.endMemory);
    console.info();

    console.info(`Total time processing: ${this.endTime - this.startTime} ms`);
    const memoryUsed = this.endMemory.heapTotal - this.startMemory.heapTotal;
    console.info(`Total memory used in processing: ${this._getMemory(memoryUsed)} MB`);
    console.info();
  }
}

module.exports = Stopwatch;
