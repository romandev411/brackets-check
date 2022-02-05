class Stack {
    constructor(maxSize = Infinity, ...array) {
        this.maxSize = maxSize;
        this.size = 0;
        for (const item of array) {
            this.push(item);
        }
    }
    get isEmpty() {
        return this._size === 0;
    }
    get size() {
        return this._size;
    }
    get maxSize() {
        return this._maxSize;
    }
    set maxSize(val) {
        this._maxSize = val;
    }
    set size(val) {
        this._size = val;
    }
    push(value) {
        if (this.size >= this.maxSize) {
            throw new RangeError('Stack overflow');
        }
        this[`_${this.size}`] = value;
        this.size = this.size + 1;
        return this.size;
    }
    pop() {
        if (this.isEmpty) {
            throw new RangeError('Stack is Empty');
        }
        const lastItem = this[`_${this.size - 1}`];
        delete this[`_${this.size - 1}`];
        this.size = this.size - 1;
        return lastItem;
    }
    pick() {
        return this[`_${this.size - 1}`];
    }
}

const options = {
    braces: {
    '(': ')',
    '{': '}',
    '[':']',
    }
}

function checkSequence (str, {braces}) {
    const stack = new Stack(str.length);
    const closeBraces = Object.values(braces);
    
    for(const symbol of str) {
        if (braces[symbol]){
            stack.push(symbol);
            continue;
        }
    
        if (symbol === braces[stack.pick()]) {
            stack.pop();
        } else if (braces[symbol] || closeBraces.includes(symbol)){
            return false;
        }
    
    }
    console.log(stack)
    return stack.isEmpty;
}

const test1= checkSequence('()+[()]', options);
const test2= checkSequence('(()+)][()', options);
console.log(test1)
console.log(test2)