# Bgset

> 🖼 Responsive background images microlibrary (277b gzipped)

## Example usage

Bgset requires `<script>` tag to be present with data attributes 

```html
<div class="container">
     <script data-src="/images/original.png" data-bgset="[/images/mobile.png (min-width: 0px) and (max-width: 400px)],[/images/tablet.png, (min-width: 401px) and (max-width: 800px)],[/images/desktop.png, (min-width: 801px)]"></script>
     <div class="background"> // This element will receive style="background: /images/*.png"
     </div> 
</div>
```

## License

MIT