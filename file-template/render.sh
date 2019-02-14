#!bin/sh

# USAGE: `sh render.sh` will render `./template.conf.tpl` to `./template.conf`

# template=$(cat ./template.conf.tpl)
# echo "$template"
# eval echo '$'$template

TEMP_FILE='./template.conf.tpl'
RES_FILE=${TEMP_FILE%.tpl} # delete `.tpl`

> $RES_FILE # empty file
while read line || [ -n "${line}" ] # deal with last line
do
  # echo $line
  # `# File Template Demo` => `# File Template Demo`
  # `home: ${HOME}` => `home: ${HOME}`

  # echo $(eval echo '$'${line}) # OR `echo $(eval echo '$'$line)`
  # `# File Template Demo` => `0 File Template Demo`
  # `home: ${HOME}` => `: /Users/jerrylee`

  # echo $(eval echo "'$'${line}")
  # `# File Template Demo` => `$# File Template Demo`
  # `home: ${HOME}` => `$home: /Users/jerrylee`

  # echo $(eval echo "${line}")
  # `# File Template Demo` => `` # Blank, maybe commented out
  # `home: ${HOME}` => `home: /Users/jerrylee`

  # echo $(eval echo "''${line}")
  # `# File Template Demo` => `# File Template Demo`
  # `home: ${HOME}` => `home: /Users/jerrylee`

  echo $(eval echo "''${line}") >> $RES_FILE
done < $TEMP_FILE


# https://askubuntu.com/a/121868
# https://qiita.com/kod314/items/f8aa4929501882e97b38
# https://orebibou.com/2015/01/%E3%82%B7%E3%82%A7%E3%83%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%A7eval%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E5%A4%89%E6%95%B0%E3%81%AE2%E9%87%8D/
# https://qiita.com/Ets/items/a7fa24b138b8ee883dac
# https://www.server-memo.net/shellscript/read-file.html
# https://qiita.com/hnw/items/291090f8632f3b40e1a0