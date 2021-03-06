import { GameMode } from '../components/GameMode';
import { ModeRules } from '../components/ModeRules';
import { ModeRanking } from '../components/ModeRanking';
import { Ranking } from '../Ranking';
import { Button } from '../components/Button';

export const gameOptionsView = (
  settings = { gameModeName: undefined, gameModeTitlesList: undefined },
  container,
  cleanViewCallbackFunction,
  gameModeName = 'people',
  onClickCallBackFunction,
) => {
  return setGameModeView(
    settings,
    container,
    cleanViewCallbackFunction,
    gameModeName,
    onClickCallBackFunction,
  );
};

function setGameModeView(
  settings = { gameModeName: undefined, gameModeTitlesList: undefined },
  parent,
  cleanViewCallbackFunction,
  gameMode = 'people',
  onClickCallBackFunction,
) {
  return renderViewArray(
    settings,
    parent,
    cleanViewCallbackFunction,
    gameMode,
    'rulesView',
    onClickCallBackFunction,
  );
}

function renderViewArray(
  settings = { gameModeName: undefined, gameModeTitlesList: undefined },
  parent,
  cleanViewCallbackFunction,
  gameModeName,
  viewModeName,
  onClickCallBackFunction,
) {
  cleanViewCallbackFunction(parent);

  const gameModeTitle = GameMode(
    getModeText(gameModeName, settings.gameModeTitlesList),
  );
  gameModeTitle.classList.add('mainContainer__titleBox');

  const modeRulesBox = ModeRules(
    getModeText(gameModeName, settings.gameModeRulesList),
  );
  modeRulesBox.classList.add('mainContainer__centralBox');

  const modeRankingBox = ModeRanking(getScoresTabFromDataBase(gameModeName));
  modeRankingBox.classList.add('mainContainer__centralBox');

  const buttonBox = document.createElement('div');
  buttonBox.classList.add('mainContainer__buttonBox');

  const hallOfFameButton = Button({
    id: 'hallOfFameButton',
    btnText: 'Hall of fame',
    classList: ['mainContainer__hallOfFameButton'],
    onClickFn: () => {
      onClickCallBackFunction(
        gameModeName,
        viewModeName,
        parent,
        renderViewArray(
          settings,
          parent,
          cleanViewCallbackFunction,
          gameModeName,
          'rankingView',
          onClickCallBackFunction,
        ),
      );
    },
    icon: 'Fame',
  });

  const rulesButton = Button({
    id: 'rulesButton',
    btnText: 'Rules',
    classList: ['mainContainer__rulesButton'],
    onClickFn: () => {
      onClickCallBackFunction(
        gameModeName,
        viewModeName,
        parent,
        renderViewArray(
          settings,
          parent,
          cleanViewCallbackFunction,
          gameModeName,
          'rulesView',
          onClickCallBackFunction,
        ),
      );
    },
    icon: 'Rules',
  });

  const playTheGameButton = Button({
    id: 'playTheGameButton',
    btnText: 'play the game',
    classList: ['mainContainer__playTheGameButton'],
    onClickFn: () => {
      onClickCallBackFunction(gameModeName, 'gameView', parent);
    },
  });
  playTheGameButton.setSpecial();

  const elementsArray = [];

  switch (viewModeName) {
    case 'rulesView':
      elementsArray.push(gameModeTitle);
      elementsArray.push(modeRulesBox);
      buttonBox.appendChild(hallOfFameButton);
      buttonBox.appendChild(playTheGameButton);
      elementsArray.push(buttonBox);
      break;
    case 'rankingView':
      elementsArray.push(gameModeTitle);
      elementsArray.push(modeRankingBox);
      buttonBox.appendChild(rulesButton);
      buttonBox.appendChild(playTheGameButton);
      elementsArray.push(buttonBox);
      break;
    case 'gameView':
      break;
    default:
      elementsArray.push(gameModeTitle);
      buttonBox.appendChild(hallOfFameButton);
      buttonBox.appendChild(playTheGameButton);
      elementsArray.push(buttonBox);
      break;
  }

  return elementsArray;
}

function getScoresTabFromDataBase(gameModeName) {
  console.log(gameModeName);
  const scorseTabFromDataBase = new Ranking(gameModeName);
  return scorseTabFromDataBase.getScores();
}

function getModeText(gameModeName, gameModesList) {
  switch (gameModeName) {
    case 'people':
      return gameModesList.people;
    case 'vehicles':
      return gameModesList.vehicles;
    case 'starships':
      return gameModesList.starships;
    default:
      return gameModesList.people;
  }
}
