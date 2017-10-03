module.exports = function(models) {


    const index = function(req, res) {
      var waiters = {
          name: req.params.username,
          days: req.body.days
        };


        models.Waiters.findOne({name: req.params.username}, function(err, results){
          if (err){
            console.log(err);
          } if (results){
            results.days = waiters.days;
            results.save(function(err, results){
              if (err){
                return next(err);
            }

            })

            res.render('index', {waiters});

          } else if (!results){
            models.Waiters.create({name: req.params.username, days: req.body.days}, function(err, results){
              if (results){results.save(function(err, results){
                if (err){
                  return next(err);
                }

              })
            }

              res.render('index', {waiters});

            })
          }

        })

      }
      const days = function(req, res) {
        var color = '';

        var weekDays = {
          Monday: [],
          MondayStatus: 'white',
          Tuesday: [],
          TuesdayStatus: 'white',
          Wednesday: [],
          WednesdayStatus: 'white',
          Thursday: [],
          ThursdayStatus: 'white',
          Friday: [],
          FridayStatus: 'white',
          Saturday: [],
          SaturdayStatus: 'white',
          Sunday: [],
          SundayStatus: 'white'
        }

        models.Waiters.find({}, function(err, results){

          if(err){
            return next(err);
          }
          if(results) {
            for (var i = 0; i < results.length; i++){
              var weekdays = results[i].days
              for (var j = 0; j < weekdays.length; j++){
                var weekday = weekdays[j];
                weekDays[weekday].push(results[i].name);
                for (let day in weekDays){
                  if (weekDays[day].length >= 4){
                    weekDays[day+'Status'] = 'red';
                  } else if(weekDays[day].length >= 3){
                    weekDays[day+'Status'] = 'green';
                  }else if(weekDays[day].length >= 1){
                    weekDays[day+'Status'] = 'blue';
                  }

                }

              }
            }

               res.render('days', weekDays);

          }
        })
      }

        return {
            index,
            days
          }
}
