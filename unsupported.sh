#!/bin/sh
file='./prisma/kysely/types.ts'
header='/* MODIFIED TO INJECT UNSUPPORTED TYPE */'
if [ "$(head -n 1 "$file")" = "$header" ]; then
	echo "Already modified"
	exit 1
else
	import="import { StPoint } from './types.unsupported'"
	body="$(cat "$file")"
	lookup='locationText:\ string\ |\ null'
	inject='location:\ StPoint'
	injected_body="$(echo "$body" | sed "s/$lookup/$inject\n$lookup/")"
	echo -e "$header\n$import\n$injected_body" >"$file"
fi
