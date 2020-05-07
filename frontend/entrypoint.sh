#!/bin/sh

join_by()
{
  local IFS="$1"; shift; echo "$*";
}

# Find vue env vars
vars=$(env | grep 'VUE_APP_\|NODE_' | awk -F = '{print "$"$1}')
vars=$(join_by ' ' $vars)
echo "Found variables $vars"

for file in /usr/share/nginx/html/js/app.*;
do
  echo "Processing $file ...";

  cp $file $file.tmpl
  envsubst "$vars" < $file.tmpl > $file
  rm $file.tmpl
done

exec "$@"