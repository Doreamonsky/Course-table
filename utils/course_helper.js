module.exports.get_course_array = get_course_array
module.exports.filter_course_by_week = filter_course_by_week


Array.prototype.clean = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);//返回指定的元素  
      i--;
    }
  }
  return this;
};

Array.prototype.clone = function () {
  var len = this.lenght,
    arr = [];

  for (var i = 0; i < len; i++) {
    if (typeof this[i] !== "object") {
      arr.push(this[i]);
    } else {
      arr.push(this[i].clone());
    }
  }
  return arr;
}



function get_course_array(course_data, currentWeek) {
  var data = []


  //按课程表得到数组
  for (var week in course_data) {
    for (var time in course_data[week]) {
      if (Array.isArray(course_data[week][time])) {

        for (var j = 0; j < course_data[week][time].length; j++) {
          var course_detail = course_data[week][time][j][0]
          var course_place = course_data[week][time][j][1]
          var course = {
            'week': convert_week(week),
            'course_time': time,
            'course_length': 1,
            'course_name': course_detail.name + "@\n" + course_place.place + "\n周数:" + course_place.week_duration,
            'course_detail': course_detail,
            'week_duration': course_place.week_duration,
            'for_class': course_detail.for_class,
          }
          if (filter_course_by_week(course, currentWeek)) {
            data.push(course)
          }

        }

      }
    }
  }

  //合并课程
  for (var i = 0; i < data.length; i++) {
    if (typeof (data[i]) == "undefined")
      continue

    var new_course_length = 1


    if (i < data.length - 1) {
      if (mergeable_course(data[i], data[i + 1], 1)) {
        new_course_length += 1
        delete (data[i + 1])
      }
    }

    if (i < data.length - 2) {
      if (mergeable_course(data[i], data[i + 2], 2)) {
        new_course_length += 1
        delete (data[i + 2])
      }
    }

    if (i < data.length - 3) {
      if (mergeable_course(data[i], data[i + 3], 3)) {
        new_course_length += 1
        delete (data[i + 3])
      }
    }

    data[i].course_length = new_course_length

  }
  data.clean()


  return data
}

//课程周数过滤
function filter_course_by_week(currentCourse, currentWeek) {
  var isCurrentEvenWeek = currentWeek % 2 == 0 //目前双周
  var isCourseValid = true //Flag
  var week_duration = currentCourse.week_duration
  var weekMatchReg = /\[(\d+)\-(\d+)\]/ //提取上课周数
  var group = weekMatchReg.exec(week_duration)

  week_duration = week_duration.replace(weekMatchReg, '') //防止干扰单周

  var startWeek = 0
  var endWeek = 0


  if (group.length == 3) {
    startWeek = parseInt(group[1])
    endWeek = parseInt(group[2])
  }

  var outOfWeekRange = currentWeek < startWeek || currentWeek > endWeek

  var notSingle = week_duration.indexOf(currentWeek) == -1 // 还有可能额外的

  if (outOfWeekRange && notSingle) {
    isCourseValid = false
  }

  if (week_duration.indexOf('单') != -1 && isCurrentEvenWeek) {
    isCourseValid = false
  }

  if (week_duration.indexOf('双') != -1 && !isCurrentEvenWeek) {
    isCourseValid = false
  }

  return isCourseValid
}
function get_course_forclasses(courseData) {

}

function mergeable_course(course01, course02, row) {
  return course01['course_name'] == course02['course_name'] &&
    course01['week'] == course02['week'] &&
    course01.course_detail['id'] == course02.course_detail['id'] &&
    Math.abs(course01['course_time'] - course02['course_time']) == row ? true : false
}

function convert_week(week) {
  switch (week) {
    case 'Mon':
      return 1
      break
    case 'Tue':
      return 2
      break
    case 'Wed':
      return 3
      break
    case 'Thus':
      return 4
      break
    case 'Fri':
      return 5
      break
  }
}

