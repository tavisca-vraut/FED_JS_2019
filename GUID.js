class GUID {
    constructor() {
        this.id = 1;
        this.availableFreeIds = [];
    }

    getId()
    {
        if (this.availableFreeIds.length !== 0)
        {
            return this.availableFreeIds.pop();
        }
        return this.id++;
    }

    addFreeId(id)
    {
        this.availableFreeIds.push(id);
    }
}
