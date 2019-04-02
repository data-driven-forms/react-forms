prnumber="$(git log -1 --oneline | sed -e 's/^.*pull request #\([0-9]*\).*$/\1/')"
# check if commit is From PR merge
if ! [[ $prnumber =~ ^[0-9]+$ ]] ; then
  echo "Not a PR merge commit exiting" >&2; exit 1
else
  #find all messages from PR
  messages=$(curl -H "Authorization: token ${BOT_TOKEN}" -X GET \
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/$/comments")

  #delete all previous messages from bot
  for row in $(echo "${messages}" | jq -r '.[] | @base64'); do
    _jq() {
      echo ${row} | base64 --decode | jq -r ${1}
    }

    login=$(_jq '.user.login')
    id=$(_jq '.id')
    if [[ ${login} = "Hyperkid-bot" ]]
      then
      curl -H "Authorization: token ${BOT_TOKEN}" -X DELETE \
      "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/comments/$id"
    fi
  done

  curl -H "Authorization: token ${BOT_TOKEN}" -X POST \
  -d "{\"body\": \"Updated demo will be shortly available at: https://data-driven-forms.surge.sh/\"}" \
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/$prnumber/comments"
fi
