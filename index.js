const core = require('@actions/core')
const github = require('@actions/github')

const main = async (workspace) => {
  const myToken = core.getInput('git-token');
  const octokit = github.getOctokit(myToken);
  const owner = github.context.payload.repository.owner.login;
  const repo = github.context.payload.repository.name;
  const username = github.context.payload.sender.login;
  const prNumber = github.context.payload.number;
  const userTeamMapString = core.getInput('user-team-map');
  const userTeamMap = JSON.parse(userTeamMapString);
  const defaultLabel = core.getInput('default-label');
  
  if(github.context.payload.pull_request && validActivityType(github.context.payload.action)) {
    assignLabel(octokit, username, userTeamMap, owner, repo, prNumber, defaultLabel);
  } else {
    core.setFailed('This action should only be runned on a opened Pull Request');
  }
}

const validActivityType = (type) => {
  validActivityTypes = ['opened'];
  return validActivityTypes.includes(type);
}


const assignLabel = async (octokit, username, userTeamMap, owner, repo, prNumber, defaultLabel) => {
  var team = userTeamMap[username];
  if(!team) {
    team = defaultLabel;
  }

  if (team) {
    console.log(`Adding label ${team} for ${username}`);
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: [team]
  })
  } else {
    console.log(`No label assigned for ${username}`);
  }
}



main()
