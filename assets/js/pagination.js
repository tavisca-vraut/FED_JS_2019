class Pagination {
    constructor (pendingTasks, tasksPerPage) {
        this.pendingTasks = pendingTasks;
        this.numberOfTasks = this.pendingTasks.length;
        this.tasksPerPage = tasksPerPage;
        this.calculatePageTasks();
    }

    calculatePageTasks() {
        this.startPage = 1;
        this.currentPage = this.startPage;

        let extraPages = this.numberOfTasks % this.tasksPerPage;

        this.endPage = parseInt((this.numberOfTasks - extraPages) / this.tasksPerPage) + 1;
        if (extraPages === 0)
            this.endPage--;
    }

    getFirst() {
        return this.pendingTasks.slice(this.currentPage-1, this.currentPage-1 + this.tasksPerPage);
    }

    getNext () {
        if (++this.currentPage > this.endPage) {
            this.currentPage -= 1;
            return false;
        }

        let startIndex = (this.currentPage - 1) * this.tasksPerPage;
        return this.pendingTasks.slice(startIndex, startIndex + this.tasksPerPage);
    }

    getPrevious () {
        if (--this.currentPage < this.startPage) {
            this.currentPage += 1;
            return false;
        }

        let startIndex = (this.currentPage - 1) * this.tasksPerPage;
        return this.pendingTasks.slice(startIndex, startIndex + this.tasksPerPage);
    }
}
