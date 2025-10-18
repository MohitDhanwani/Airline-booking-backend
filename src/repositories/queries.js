function addRowLockOnFlights(flightId){
    return `Select * from flights WHERE Flight.id = ${flightId} FOR UPDATE;`
}

module.exports = {
    addRowLockOnFlights,
} 