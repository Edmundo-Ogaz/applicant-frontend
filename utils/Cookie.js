const NAME_COOKIE = 'applicantApp'

function add(user) {
  if (!user || !user.id || !user.email || !user.company || !user.profile) {
    return
  }

  document.cookie = `${NAME_COOKIE}=logged=true,id=${user.id},email=${user.email},company=${user.company},profile=${user.profile};`;
}

function getUser() {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${NAME_COOKIE}=`);
    if (parts.length === 2) {
      return strToObj(parts.pop());
    }
  } catch (e) {
    console.error(e)
  }
  return {} 
}

function getId() {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${NAME_COOKIE}=`);
    if (parts.length === 2) {
      const bject = strToObj(parts.pop());
      return object.id
    }
  } catch (e) {
    console.error(e)
  }
}

function remove() {
  document.cookie = `${NAME_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function strToObj(str) {
  str = str.split(',');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  }
  return result;
}

const Cookie = { getUser, add, remove, getId }

export default Cookie