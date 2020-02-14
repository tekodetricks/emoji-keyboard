import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { DataService, ICategory, SettingsService } from "../../services";


// const COMPACT = true;


@Component({
	selector: "app-tabbar",
	templateUrl: "./tabbar.component.html",
	styleUrls: [ "./tabbar.component.scss" ],
})
export class TabbarComponent implements OnInit {
	categories: Array<any>;
	compact: boolean;
	constructor(
		@Inject(DataService) private data: DataService,
		@Inject(SettingsService) private prefs: SettingsService,
		@Inject(Router) public router: Router,
		@Inject(DomSanitizer) private sanitizer: DomSanitizer,
		@Inject(MatIconRegistry) private registry: MatIconRegistry,
	) {
		this.categories = data.getCategories();
		this.compact = prefs.settings.compact;
		prefs.subscribe((changes) => {
			const change = changes.pop();
			if (change.type === "update" && change.path.includes("compact")) {
				this.compact = change.value;
			}
		});
		for (const category of this.categories as ICategory[]) {
			registry.addSvgIcon(
				category.icon,
				sanitizer.bypassSecurityTrustResourceUrl(
					`../../../assets/emoji/categories/${category.icon}`
				)
			);
		}
	}

	ngOnInit() {}
}