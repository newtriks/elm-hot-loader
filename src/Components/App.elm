module Components.App (Model, Action(..), init, update, view) where

import Effects exposing (Effects, Never)
import Signal exposing (Signal, Address)
import StartApp
import Html exposing (..)
import Html.Attributes exposing (..)

-- MODEL

type alias Model =
  { }

init : ( Model, Effects.Effects Action )
init =
  ({ }, Effects.none)


-- UPDATE

type Action
  = Empty -- this action does not modify model, triggers a re-render

update : Action -> Model -> ( Model, Effects.Effects Action )
update action model =
  case action of
    Empty -> ( model, Effects.none )


-- VIEW

view : Address Action -> Model -> Html
view address model =
  div
    [ class "App"]
    [ h1
      [ ]
      [ text "Hello World" ]
    , button
      [ class "Button" ]
      [ text "Click" ]
    ]
