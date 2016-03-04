import Effects exposing (Never)
import StartApp
import Task

import Components.App exposing (..)

app : StartApp.App Model
app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = [ swapsignal ]
    }

main =
  app.html

-- HOT LOADER

-- After hot swapping, elm-hot-load will call 'swap' port to trigger a re-render.
port swap : Signal Bool

swapsignal : Signal Action
swapsignal =
  Signal.map (\_ -> Empty) swap