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

  generate_cheatsheet(data)
  generate_component_json(data)
  generate_composer_json(data)
  generate_bower_json(data)


def generate_font_files():
  print "Generate Fonts"
  cmd = "fontforge -script %s/scripts/generate_font.py" % (BUILDER_PATH)
  call(cmd, shell=True)


def generate_cheatsheet(data):
  print "Generate Cheatsheet"

  cheatsheet_file_path = os.path.join(ROOT_PATH, 'cheatsheet.html')
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
  template_html = template_html.replace("{{font_version}}", data["version"])
  template_html = template_html.replace("{{icon_count}}", str(len(data["icons"])) )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = open(cheatsheet_file_path, 'w')
  f.write(template_html)
  f.close()

def generate_component_json(data):
  print "Generate component.json"
  cssFileName = 'framework7-icons'
  fontFileName = 'Framework7Icons-Regular';
  d = {
    "name": data['name'],
    "repo": "nolimits4web/framework7-icons",
    "description": "The premium iOS-icons icon font for Framework7",
    "version": data['version'],
    "keywords": [],
    "dependencies": {},
    "development": {},
    "license": "MIT",
    "styles": [
      "css/%s.css" % (cssFileName)
    ],
    "fonts": [
      "fonts/%s.eot" % (fontFileName),
      "fonts/%s.svg" % (fontFileName),
      "fonts/%s.ttf" % (fontFileName),
      "fonts/%s.woff" % (fontFileName),
      "fonts/%s.woff2" % (fontFileName)
    ]
  }
  txt = json.dumps(d, indent=4, separators=(',', ': '))

  component_file_path = os.path.join(ROOT_PATH, 'component.json')
  f = open(component_file_path, 'w')
  f.write(txt)
  f.close()


def generate_composer_json(data):
  print "Generate composer.json"
  cssFileName = 'framework7-icons'
  fontFileName = 'Framework7Icons-Regular';
  d = {
    "name": "nolimits4web/framework7-icons",
    "description": "The premium iOS-icons icon font for Framework7",
    "keywords": [ "fonts", "icon font", "icons", "framework7", "web font", "ios", "ios icons"],
    "homepage": "http://framework7.io/",
    "authors": [
      {
        "name": "Vladimir Kharalmpidi",
        "email": "nolimits4web@gmail.com",
        "role": "Designer",
        "homepage": "https://idangero.us"
      }
    ],
    "extra": {},
    "license": [ "MIT" ]
  }
  txt = json.dumps(d, indent=4, separators=(',', ': '))

  composer_file_path = os.path.join(ROOT_PATH, 'composer.json')
  f = open(composer_file_path, 'w')
  f.write(txt)
  f.close()


def generate_bower_json(data):
  print "Generate bower.json"
  cssFileName = 'framework7-icons'
  fontFileName = 'Framework7Icons-Regular';
  d = {
    "name": data['name'].replace(' ', '-').lower(),
    "version": data['version'],
    "homepage": "https://framework7.io",
    "authors": [
      "Vladimir Kharlampidi <nolimits4web@gmail.com>"
    ],
    "description": "The premium iOS-icons icon font for Framework7",
    "main": [
      "css/%s.css" % (cssFileName),
      "fonts/*"
    ],
    "keywords": [ "fonts", "icon font", "icons", "framework7", "web font", "ios", "ios icons"],
    "license": "MIT",
    "ignore": [
      "**/.*",
      "build",
      "node_modules",
      "bower_components"
    ]
  }
  txt = json.dumps(d, indent=4, separators=(',', ': '))

  bower_file_path = os.path.join(ROOT_PATH, 'bower.json')
  f = open(bower_file_path, 'w')
  f.write(txt)
  f.close()


def get_build_data():
  build_data_path = os.path.join(BUILDER_PATH, 'build_data.json')
  f = open(build_data_path, 'r')
  data = json.loads(f.read())
  f.close()
  return data


if __name__ == "__main__":
  main()
