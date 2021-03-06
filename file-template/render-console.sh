#!bin/sh

# USAGE: `export TEMP_FILE='./sample'; sh render-console.sh template.conf.tpl > res.txt`
# See: https://qiita.com/jerrywdlee/items/e99c519ae2af96d89985

if [ ! -f $1 ]; then
  echo "Usage:\n$ sh render-console.sh template.tpl > target.txt"
  exit 1
fi

while read line || [ -n "${line}" ]
do
  echo $(eval echo "''${line}")
done < $1
