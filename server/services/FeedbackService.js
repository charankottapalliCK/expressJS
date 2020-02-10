const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile); //read permissions to json file
const writeFile =  util.promisify(fs.writeFile); //write permissions to json file

class FeedbackService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getList(){
      const data = await this.getData();
      return data;
  }

  async addEntry(name,title,message){
      const data = await this.getData();
      data.unshift({name, title, message});
      return writeFile(this.datafile , JSON.stringify(data));
  }
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = FeedbackService;