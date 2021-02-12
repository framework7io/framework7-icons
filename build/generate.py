# Font generation script from Ionicons
# https://github.com/driftyco/ionicons/
# http://ionicons.com/

from subprocess import call
import os
import json


BUILDER_PATH = os.path.dirname(os.path.abspath(__file__))
ROOT_PATH = os.path.join(BUILDER_PATH, '..')
FONTS_FOLDER_PATH = os.path.join(ROOT_PATH, 'fonts')

def main():
  generate_font_files()

  data = get_build_data()
  package = get_package()

  generate_cheatsheet(data, package)


def generate_font_files():
  print ("Generate Fonts")
  cmd = "fontforge -script %s/scripts/generate_font.py" % (BUILDER_PATH)
  call(cmd, shell=True)


def generate_cheatsheet(data, package):
  print ("Generate Cheatsheet")

  cheatsheet_file_path = os.path.join(ROOT_PATH, 'cheatsheet/index.html')
  template_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'icon-row.html')

  f = open(template_path, 'r')
  template_html = f.read()
  f.close()

  f = open(icon_row_path, 'r')
  icon_row_template = f.read()
  f.close()

  content = []

  for icon in data['icons']:
    item_row = icon_row_template

    item_row = item_row.replace('{{name}}', icon['name'])

    content.append(item_row)

  template_html = template_html.replace("{{font_name}}", data["name"])
  template_html = template_html.replace("{{font_version}}", package["version"])
  template_html = template_html.replace("{{icon_count}}", str(len(data["icons"])) )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = open(cheatsheet_file_path, 'w')
  f.write(template_html)
  f.close()

def get_build_data():
  build_data_path = os.path.join(BUILDER_PATH, 'build_data.json')
  f = open(build_data_path, 'r')
  data = json.loads(f.read())
  f.close()
  return data

def get_package():
  package_path = os.path.join(ROOT_PATH, 'package.json')
  f = open(package_path, 'r')
  package = json.loads(f.read())
  f.close()
  return package


if __name__ == "__main__":
  main()
