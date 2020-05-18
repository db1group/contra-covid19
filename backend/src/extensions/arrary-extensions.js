function first() {
    return this[0];
}

function last() {
    return this.slice(-1)[0];
}

function skip(size) {
    return this.slice(size, this.length);
}

if (!Array.prototype.first) {
    Array.prototype.first = first;
}

if (!Array.prototype.last) {
    Array.prototype.last = last;
}

if (!Array.prototype.skip) {
    Array.prototype.skip = skip;
}