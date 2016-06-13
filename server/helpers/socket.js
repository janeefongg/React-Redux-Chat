const userDetails = (function () {
  const usernames = [];
  var userCounter = 0;

  function generateUser () {
    console.log('inside generate user');
    userCounter++;
    usernames.push(userCounter);
    console.log(userCounter);
    return 'DefaultUser' + userCounter;
  }
  
  function getUser () {
    return generateUser();
  }

  function usernameExists (newName) {
    console.log('usernames list:', usernames)
    if (usernames.indexOf(newName) === -1) {
      usernames.push(newName);
      console.log('does not exist');
      return true;
    } else {
      console.log('username eixsts');
      return false;
    }
  }
  
  return {
    generateUser: generateUser,
    getUser: getUser,
    usernameExists: usernameExists,
    usernames: usernames
  }

})();

module.exports = function (socket) {
  var name = userDetails.getUser();
  socket.emit('init', {name: userDetails.getUser(), users: userDetails.usernames});
  socket.on('change:name', function (data, callback) {
    console.log('change name data: ', data);
    if (userDetails.usernameExists(data.name)) {
      socket.broadcast.emit('change:name', {oldName: name, newName: data.name});
      callback(true);
    } else {
      callback(false);
    }
  });
  
  socket.on('send:message', function(data) {
    console.log('this is data from sending message: ', data)
    socket.broadcast.emit('send:message', data);
  })
};